import { LoginEntity } from './login.models';
import {
  loginAdapter,
  LoginPartialState,
  initialLoginState,
} from './login.reducer';
import * as LoginSelectors from './login.selectors';

describe('Login Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLoginId = (it: LoginEntity) => it.id;
  const createLoginEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LoginEntity);

  let state: LoginPartialState;

  beforeEach(() => {
    state = {
      login: loginAdapter.setAll(
        [
          createLoginEntity('PRODUCT-AAA'),
          createLoginEntity('PRODUCT-BBB'),
          createLoginEntity('PRODUCT-CCC'),
        ],
        {
          ...initialLoginState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Login Selectors', () => {
    it('selectAllLogin() should return the list of Login', () => {
      const results = LoginSelectors.selectAllLogin(state);
      const selId = getLoginId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = LoginSelectors.selectEntity(state) as LoginEntity;
      const selId = getLoginId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectLoginLoaded() should return the current "loaded" status', () => {
      const result = LoginSelectors.selectLoginLoaded(state);

      expect(result).toBe(true);
    });

    it('selectLoginError() should return the current "error" state', () => {
      const result = LoginSelectors.selectLoginError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
