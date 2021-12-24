import { createReducer, on } from '@ngrx/store';

import * as loadingActions from '../actions/loading.actions';

export const loadingFeatureKey = 'app';

export interface LoadingState {
  loading: boolean;
}

export const initialState: LoadingState = {
  loading: false,
};

export const loadingReducer = createReducer(
  initialState,
  on(loadingActions.startLoading, state => ({ ...state, loading: true })),
  on(loadingActions.stopLoading, state => ({ ...state, loading: false }))
);
