import { createAction, props } from '@ngrx/store';

export const initHome = createAction('[Home Page] Init');

export const loadHomeSuccess = createAction(
  '[Home/API] Load Home Success',
  props<{ count: number }>()
);

export const loadHomeFailure = createAction(
  '[Home/API] Load Home Failure',
  props<{ error: any }>()
);
 
export const drink = createAction('[Login Page] Drink');

export const drinkSuccess = createAction('[API] Drink Success');

export const drinkFailure = createAction(
  '[API] Drink Failure',
  props<{ error: any }>()
);
