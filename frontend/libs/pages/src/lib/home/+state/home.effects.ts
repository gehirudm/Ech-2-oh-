import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.initHome),
      switchMap(() => of(HomeActions.loadHomeSuccess({ home: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(HomeActions.loadHomeFailure({ error }));
      })
    )
  );
}
