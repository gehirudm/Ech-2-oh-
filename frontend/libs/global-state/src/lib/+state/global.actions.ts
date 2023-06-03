import { createAction, props } from '@ngrx/store';
import { GlobalEntity } from './global.models';

export const initGlobal = createAction('[Global Page] Init');

export const setData = createAction(
  '[Login Page] Set globals',
  props<{ id: string; username: string; }>()
);
