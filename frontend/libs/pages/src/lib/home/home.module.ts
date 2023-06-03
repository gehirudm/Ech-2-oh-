import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromHome from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { HomeFacade } from './+state/home.facade';

import { ServicesModule } from "@frontend/services";
import { LottieModule } from 'ngx-lottie';
import { GlobalStateModule } from '@frontend/global-state';
import { LetDirective } from '@ngrx/component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoreModule.forFeature(fromHome.HOME_FEATURE_KEY, fromHome.homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    LottieModule,
    GlobalStateModule,
    ServicesModule,
    LetDirective,
  ],
  declarations: [HomePage],
  providers: [HomeFacade],
})
export class HomePageModule {}
