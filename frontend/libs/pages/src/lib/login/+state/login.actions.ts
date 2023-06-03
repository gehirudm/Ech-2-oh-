import { createAction, props } from '@ngrx/store';

export const initLogin = createAction('[Login Page] Init');

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string }>()
);

export const loginSuccess = createAction(
  '[Login/API] Login Success',
  props<{ id: string, username: string }>()
);

export const loginFailure = createAction(
  '[Login/API] Load Login Failure',
  props<{ error: any }>()
);


