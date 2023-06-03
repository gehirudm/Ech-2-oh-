import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as GlobalActions from './global.actions';
import { GlobalEffects } from './global.effects';
import { GlobalFacade } from './global.facade';
import { GlobalEntity } from './global.models';
import {
  GLOBAL_FEATURE_KEY,
  GlobalState,
  initialGlobalState,
  globalReducer,
} from './global.reducer';
import * as GlobalSelectors from './global.selectors';

interface TestSchema {
  global: GlobalState;
}

describe('GlobalFacade', () => {
  let facade: GlobalFacade;
  let store: Store<TestSchema>;
  const createGlobalEntity = (id: string, name = ''): GlobalEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GLOBAL_FEATURE_KEY, globalReducer),
          EffectsModule.forFeature([GlobalEffects]),
        ],
        providers: [GlobalFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GlobalFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGlobal$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGlobal$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGlobalSuccess` to manually update list
     */
    it('allGlobal$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGlobal$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GlobalActions.loadGlobalSuccess({
          global: [createGlobalEntity('AAA'), createGlobalEntity('BBB')],
        })
      );

      list = await readFirst(facade.allGlobal$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
