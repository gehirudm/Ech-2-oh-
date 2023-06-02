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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StoreModule.forFeature(fromHome.HOME_FEATURE_KEY, fromHome.homeReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  declarations: [HomePage],
  providers: [HomeFacade],
})
export class HomePageModule {}
