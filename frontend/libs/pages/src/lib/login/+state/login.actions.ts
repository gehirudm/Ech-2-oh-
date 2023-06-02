import { createAction, props } from '@ngrx/store';
import { LoginEntity } from './login.models';

export const initLogin = createAction('[Login Page] Init');

export const loadLoginSuccess = createAction(
  '[Login/API] Load Login Success',
  props<{ login: LoginEntity[] }>()
);

export const loadLoginFailure = createAction(
  '[Login/API] Load Login Failure',
  props<{ error: any }>()
);
