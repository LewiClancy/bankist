import { ActionReducerMap } from '@ngrx/store';

import * as fromLoading from './reducers/loading.reducer';
import * as fromAlert from './reducers/alert.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromAccount from './reducers/account.reducer';

export const appStateKey = 'app';
export interface AppState {
  [fromLoading.loadingFeatureKey]: fromLoading.LoadingState;
  [fromAlert.alertFeatureKey]: fromAlert.AlertState;
  [fromAuth.authFeatureKey]: fromAuth.AuthState;
  [fromAccount.accountFeaturekey]: fromAccount.AccountState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromLoading.loadingFeatureKey]: fromLoading.reducer,
  [fromAlert.alertFeatureKey]: fromAlert.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromAccount.accountFeaturekey]: fromAccount.reducer,
};
