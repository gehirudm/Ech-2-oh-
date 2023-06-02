import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';
import { LoginEntity } from './login.models';

export const LOGIN_FEATURE_KEY = 'login';

export interface LoginState extends EntityState<LoginEntity> {
  selectedId?: string | number; // which Login record has been selected
  loaded: boolean; // has the Login list been loaded
  error?: string | null; // last known error (if any)
}

export interface LoginPartialState {
  readonly [LOGIN_FEATURE_KEY]: LoginState;
}

export const loginAdapter: EntityAdapter<LoginEntity> =
  createEntityAdapter<LoginEntity>();

export const initialLoginState: LoginState = loginAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialLoginState,
  on(LoginActions.initLogin, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(LoginActions.loadLoginSuccess, (state, { login }) =>
    loginAdapter.setAll(login, { ...state, loaded: true })
  ),
  on(LoginActions.loadLoginFailure, (state, { error }) => ({ ...state, error }))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
  return reducer(state, action);
}
