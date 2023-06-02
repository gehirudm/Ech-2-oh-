import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.initLogin),
      switchMap(() => of(LoginActions.loadLoginSuccess({ login: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(LoginActions.loadLoginFailure({ error }));
      })
    )
  );
}
