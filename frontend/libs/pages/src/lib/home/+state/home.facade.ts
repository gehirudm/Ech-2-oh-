import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import * as HomeSelectors from './home.selectors';
import { GlobalFacade } from '@frontend/global-state';

@Injectable()
export class HomeFacade {
  private readonly store = inject(Store);
  private globalFacade = inject(GlobalFacade)

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(HomeSelectors.selectLoaded));
  id$ = this.globalFacade.id$
  username$ = this.globalFacade.username$
  count$ = this.store.select(HomeSelectors.selectCount)
  isDrinking$ = this.store.select(HomeSelectors.selectIsDrinking)
  errors$ = this.store.select(HomeSelectors.selectHomeError)

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(HomeActions.initHome());
  }

  drink() {
    this.store.dispatch(HomeActions.drink())
  }
}
