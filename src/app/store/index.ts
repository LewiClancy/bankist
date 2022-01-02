import { ActionReducerMap } from '@ngrx/store';

import * as fromLoading from './reducers/loading.reducer';
import * as fromAlert from './reducers/alert.reducer';
import * as fromAuth from './reducers/auth.reducer';

export const appStateKey = 'app';
export interface AppState {
  [fromLoading.loadingFeatureKey]: fromLoading.LoadingState;
  [fromAlert.alertFeatureKey]: fromAlert.AlertState;
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromLoading.loadingFeatureKey]: fromLoading.reducer,
  [fromAlert.alertFeatureKey]: fromAlert.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
};
