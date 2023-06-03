import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';
import { HomeEntity } from './home.models';

export const HOME_FEATURE_KEY = 'home';

export interface HomeState {
  loaded: boolean; // has the Home list been loaded
  isDrinking: boolean;
  count: number;
  error?: string | null; // last known error (if any)
}

export interface HomePartialState {
  readonly [HOME_FEATURE_KEY]: HomeState;
}

export const initialHomeState: HomeState = {
  // set initial required properties
  loaded: false,
  isDrinking: false,
  count: 0,
}

const reducer = createReducer(
  initialHomeState,
  on(HomeActions.initHome, (state) => ({
    ...state,
    loaded: false,
    isDrinking: false,
    error: null,
    count: 0,
  })),
  on(HomeActions.loadHomeSuccess, (state, { count }) => ({
    ...state,
    count,
    loaded: true,
  })),
  on(HomeActions.loadHomeFailure, (state, { error }) => ({ ...state, error })),
  on(HomeActions.drink, (state) => ({
    ...state,
    isDrinking: true,
  })),
  on(HomeActions.drinkSuccess, (state) => ({
    ...state,
    count: state.count + 1,
    isDrinking: false,
  })),
  on(HomeActions.drinkFailure, (state, { error }) => ({
    ...state,
    error,
    isDrinking: false,
  })),
);

export function homeReducer(state: HomeState | undefined, action: Action) {
  return reducer(state, action);
}
