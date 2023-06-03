import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as GlobalActions from './global.actions';
import * as GlobalFeature from './global.reducer';

@Injectable()
export class GlobalEffects {
  private actions$ = inject(Actions);

}
