import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGlobal from './+state/global.reducer';
import { GlobalEffects } from './+state/global.effects';
import { GlobalFacade } from './+state/global.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromGlobal.GLOBAL_FEATURE_KEY,
      fromGlobal.globalReducer
    ),
    EffectsModule.forFeature([GlobalEffects]),
  ],
  providers: [GlobalFacade],
})
export class GlobalStateModule {}
