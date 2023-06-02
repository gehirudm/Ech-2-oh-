import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLogin from './+state/login.reducer';
import { LoginEffects } from './+state/login.effects';
import { LoginFacade } from './+state/login.facade';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    StoreModule.forFeature(fromLogin.LOGIN_FEATURE_KEY, fromLogin.loginReducer),
    EffectsModule.forFeature([LoginEffects]),
  ],
  declarations: [LoginPage],
  providers: [LoginFacade],
})
export class LoginPageModule {}
