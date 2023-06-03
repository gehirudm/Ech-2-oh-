import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GLOBAL_FEATURE_KEY,
  GlobalState,
} from './global.reducer';

// Lookup the 'Global' feature state managed by NgRx
export const selectGlobalState =
  createFeatureSelector<GlobalState>(GLOBAL_FEATURE_KEY);

export const selectId = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.id
);

export const selectUsername = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.username
);