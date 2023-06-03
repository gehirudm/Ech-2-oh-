import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';

export const LOGIN_FEATURE_KEY = 'login';

export interface LoginState {
  isLoggingIn: boolean;
  error?: string | null; // last known error (if any)
}

export interface LoginPartialState {
  readonly [LOGIN_FEATURE_KEY]: LoginState;
}

export const initialLoginState: LoginState = {
  // set initial required properties
  isLoggingIn: false
}

const reducer = createReducer(
  initialLoginState,
  on(LoginActions.initLogin, (state) => ({
    ...state,
    isLoggingIn: false,
    error: null,
  })),
  // on(LoginActions.loginSuccess, (state, { id, username }) =>
  //   loginAdapter.setAll(login, { ...state, loaded: true })
  // ),
  on(LoginActions.login, (state) => ({ ...state, isLoggingIn: true })),
  on(LoginActions.loginFailure, (state, { error }) => ({ ...state, error, isLoggingIn: false })),
  on(LoginActions.loginSuccess, (state) => ({ ...state, isLoggingIn: false })),
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return reducer(state, action);
}
