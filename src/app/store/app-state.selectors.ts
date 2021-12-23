import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './index';

export const appStateSelector = createFeatureSelector<fromApp.AppState>(
  fromApp.appStateKey
);

export const selectIsLoading = createSelector(
  appStateSelector,
  state => state.loading
);
