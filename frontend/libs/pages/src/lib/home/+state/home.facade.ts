import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import * as HomeSelectors from './home.selectors';

@Injectable()
export class HomeFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(HomeSelectors.selectHomeLoaded));
  allHome$ = this.store.pipe(select(HomeSelectors.selectAllHome));
  selectedHome$ = this.store.pipe(select(HomeSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(HomeActions.initHome());
  }
}
