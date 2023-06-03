import { createReducer, on, Action } from '@ngrx/store';

import * as GlobalActions from './global.actions';

export const GLOBAL_FEATURE_KEY = 'global';

export interface GlobalState {
  id?: string | null;
  username?: string| null;
}

export interface GlobalPartialState {
  readonly [GLOBAL_FEATURE_KEY]: GlobalState;
}


export const initialGlobalState: GlobalState = {
  // set initial required properties
  id: null,
  username: null,
}

const reducer = createReducer(
  initialGlobalState,
  on(GlobalActions.initGlobal, (state) => ({
    ...state,
    id: null,
    username: null,
  })),
  on(GlobalActions.setData, (state, { id, username }) => ({
    ...state,
    id,
    username
  }))
);

export function globalReducer(state: GlobalState | undefined, action: Action) {
  return reducer(state, action);
}
