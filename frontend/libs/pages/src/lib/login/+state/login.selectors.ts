import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_FEATURE_KEY, LoginState, loginAdapter } from './login.reducer';

// Lookup the 'Login' feature state managed by NgRx
export const selectLoginState =
  createFeatureSelector<LoginState>(LOGIN_FEATURE_KEY);

const { selectAll, selectEntities } = loginAdapter.getSelectors();

export const selectLoginLoaded = createSelector(
  selectLoginState,
  (state: LoginState) => state.loaded
);

export const selectLoginError = createSelector(
  selectLoginState,
  (state: LoginState) => state.error
);

export const selectAllLogin = createSelector(
  selectLoginState,
  (state: LoginState) => selectAll(state)
);

export const selectLoginEntities = createSelector(
  selectLoginState,
  (state: LoginState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectLoginState,
  (state: LoginState) => state.selectedId
);

export const selectEntity = createSelector(
  selectLoginEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
