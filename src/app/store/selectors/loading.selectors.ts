import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoading from '../reducers/loading.reducer';

export const selectLoadingState =
  createFeatureSelector<fromLoading.LoadingState>(
    fromLoading.loadingFeatureKey
  );

export const selectIsLoading = createSelector(
  selectLoadingState,
  state => state.loading
);
