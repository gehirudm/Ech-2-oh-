import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap, map, tap, exhaustMap } from 'rxjs';
import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';
import { AuthService } from 'libs/services/src/lib/auth/auth.service';

import { GlobalFacade } from '@frontend/global-state';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService)
  private globalFacade = inject(GlobalFacade)
  private router = inject(Router)

  doLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap(({ username }) => 
        this.authService.login(username).pipe(
          map((res) => LoginActions.loginSuccess(res))
        )
      )
    )
  );

  afterLoginSetData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      tap(({id, username}) => this.globalFacade.setData(id, username))
    ), { dispatch: false }
  );

  afterLoginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      tap(() => this.router.navigate(['/home']))
    ), { dispatch: false }
  );
}
