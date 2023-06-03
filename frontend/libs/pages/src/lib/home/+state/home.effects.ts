import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, mergeMap, withLatestFrom, map, filter, exhaustMap } from 'rxjs';
import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import { GlobalFacade } from '@frontend/global-state';
import { Store } from '@ngrx/store';
import { DrinkService } from 'libs/services/src/lib/drink/drink.service';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);
  private globalFacade = inject(GlobalFacade);
  private drinkService = inject(DrinkService)

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.initHome),
      withLatestFrom(this.globalFacade.id$.pipe(filter(x => !!x))),
      switchMap(([_action, id]) => 
        this.drinkService.getDrinkCount(id as string).pipe(
          map((res) => HomeActions.loadHomeSuccess(res)),
          catchError((error) => {
            console.error('Error', error);
            return of(HomeActions.loadHomeFailure({ error }));
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(HomeActions.loadHomeFailure({ error }));
      })
    )
  );

  drink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.drink),
      withLatestFrom(this.globalFacade.id$.pipe(filter(x => !!x))),
      exhaustMap(([_action, id]) => 
        this.drinkService.drink(id as string).pipe(
          map(() => HomeActions.drinkSuccess()),
          catchError((error) => {
            console.error('Error', error);
            return of(HomeActions.drinkFailure({ error }));
          })
        )
      )
    )
  );
}
