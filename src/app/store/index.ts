import { ActionReducerMap } from '@ngrx/store';

import * as fromLoading from './reducers/loading.reducer';
import * as fromAlert from './reducers/alert.reducer';

export const appStateKey = 'app';
export interface AppState {
  [fromLoading.loadingFeatureKey]: fromLoading.LoadingState;
  [fromAlert.alertFeatureKey]: fromAlert.AlertState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromLoading.loadingFeatureKey]: fromLoading.reducer,
  [fromAlert.alertFeatureKey]: fromAlert.reducer,
};
