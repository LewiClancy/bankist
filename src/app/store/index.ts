import { ActionReducerMap } from '@ngrx/store';

import * as fromLoading from './reducers/loading.reducer';

export const appStateKey = 'app';
export interface AppState {
  [fromLoading.loadingFeatureKey]: fromLoading.LoadingState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromLoading.loadingFeatureKey]: fromLoading.loadingReducer,
};
