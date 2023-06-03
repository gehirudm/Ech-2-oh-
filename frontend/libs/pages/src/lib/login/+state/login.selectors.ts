import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_FEATURE_KEY, LoginState } from './login.reducer';

// Lookup the 'Login' feature state managed by NgRx
export const selectLoginState =
  createFeatureSelector<LoginState>(LOGIN_FEATURE_KEY);

export const selectIsLoggingIn = createSelector(
  selectLoginState,
  (state: LoginState) => state.isLoggingIn
);

export const selectLoginErrors = createSelector(
  selectLoginState,
  (state: LoginState) => state.error
);