import { Action } from '@ngrx/store';

import * as LoginActions from './login.actions';
import { LoginEntity } from './login.models';
import { LoginState, initialLoginState, loginReducer } from './login.reducer';

describe('Login Reducer', () => {
  const createLoginEntity = (id: string, name = ''): LoginEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Login actions', () => {
    it('loadLoginSuccess should return the list of known Login', () => {
      const login = [
        createLoginEntity('PRODUCT-AAA'),
        createLoginEntity('PRODUCT-zzz'),
      ];
      const action = LoginActions.loadLoginSuccess({ login });

      const result: LoginState = loginReducer(initialLoginState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = loginReducer(initialLoginState, action);

      expect(result).toBe(initialLoginState);
    });
  });
});
