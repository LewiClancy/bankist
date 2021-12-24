import { createReducer, on } from '@ngrx/store';
import * as alertActons from '../actions/alert.actions';

export const alertFeatureKey = 'alert';

export interface AlertState {
  message: string | undefined;
}

export const initialState: AlertState = {
  message: undefined,
};

export const reducer = createReducer(
  initialState,
  on(alertActons.setErrorMessage, (state, { message }) => ({
    ...state,
    message,
  })),
  on(alertActons.clearMesssage, state => ({
    ...state,
    message: undefined,
  }))
);
