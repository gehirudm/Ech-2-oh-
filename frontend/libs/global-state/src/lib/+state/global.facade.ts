import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as GlobalActions from './global.actions';
import * as GlobalFeature from './global.reducer';
import * as GlobalSelectors from './global.selectors';

@Injectable()
export class GlobalFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  id$ = this.store.pipe(select(GlobalSelectors.selectId));
  username$ = this.store.pipe(select(GlobalSelectors.selectUsername));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(GlobalActions.initGlobal());
  }

  setData(id: string, username: string) {
    this.store.dispatch(GlobalActions.setData({ id, username }))
  }
}
