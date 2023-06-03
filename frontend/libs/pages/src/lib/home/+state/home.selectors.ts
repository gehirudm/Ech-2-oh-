import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOME_FEATURE_KEY, HomeState } from './home.reducer';

// Lookup the 'Home' feature state managed by NgRx
export const selectHomeState =
  createFeatureSelector<HomeState>(HOME_FEATURE_KEY);

export const selectLoaded = createSelector(
  selectHomeState,
  (state: HomeState) => state.loaded
);

export const selectIsDrinking = createSelector(
  selectHomeState,
  (state: HomeState) => state.isDrinking
);

export const selectCount = createSelector(
  selectHomeState,
  (state: HomeState) => state.count
);

export const selectHomeError = createSelector(
  selectHomeState,
  (state: HomeState) => state.error
);