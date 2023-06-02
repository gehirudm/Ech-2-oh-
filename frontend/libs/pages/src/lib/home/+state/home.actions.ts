import { createAction, props } from '@ngrx/store';
import { HomeEntity } from './home.models';

export const initHome = createAction('[Home Page] Init');

export const loadHomeSuccess = createAction(
  '[Home/API] Load Home Success',
  props<{ home: HomeEntity[] }>()
);

export const loadHomeFailure = createAction(
  '[Home/API] Load Home Failure',
  props<{ error: any }>()
);
