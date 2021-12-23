import { createReducer, on } from '@ngrx/store';

import * as appActions from './app-state.actions';

export const appStateKey = 'app';
export interface AppState {
  loading: boolean;
}

export const initialState: AppState = {
  loading: false,
};

export const appReducer = createReducer(
  initialState,
  on(appActions.startLoading, state => ({ ...state, loading: true })),
  on(appActions.stopLoading, state => ({ ...state, loading: false }))
);
