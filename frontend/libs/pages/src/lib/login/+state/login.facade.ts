import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as LoginActions from './login.actions';
import * as LoginFeature from './login.reducer';
import * as LoginSelectors from './login.selectors';

@Injectable()
export class LoginFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  
  isLoggingIn$ = this.store.select(LoginSelectors.selectIsLoggingIn)
  error$ = this.store.select(LoginSelectors.selectLoginErrors)
  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(LoginActions.initLogin());
  }

  login(username: string) {
    this.store.dispatch(LoginActions.login({ username }))
  }
}
