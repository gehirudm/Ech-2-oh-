import { HomeEntity } from './home.models';
import {
  homeAdapter,
  HomePartialState,
  initialHomeState,
} from './home.reducer';
import * as HomeSelectors from './home.selectors';

describe('Home Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHomeId = (it: HomeEntity) => it.id;
  const createHomeEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HomeEntity);

  let state: HomePartialState;

  beforeEach(() => {
    state = {
      home: homeAdapter.setAll(
        [
          createHomeEntity('PRODUCT-AAA'),
          createHomeEntity('PRODUCT-BBB'),
          createHomeEntity('PRODUCT-CCC'),
        ],
        {
          ...initialHomeState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Home Selectors', () => {
    it('selectAllHome() should return the list of Home', () => {
      const results = HomeSelectors.selectAllHome(state);
      const selId = getHomeId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = HomeSelectors.selectEntity(state) as HomeEntity;
      const selId = getHomeId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectHomeLoaded() should return the current "loaded" status', () => {
      const result = HomeSelectors.selectHomeLoaded(state);

      expect(result).toBe(true);
    });

    it('selectHomeError() should return the current "error" state', () => {
      const result = HomeSelectors.selectHomeError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
