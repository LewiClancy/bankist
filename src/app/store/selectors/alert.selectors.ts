import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlert from '../reducers/alert.reducer';

export const selectAlertState = createFeatureSelector<fromAlert.AlertState>(
  fromAlert.alertFeatureKey
);

export const selectHasAlert = createSelector(selectAlertState, state => {
  return state.message ? true : false;
});

export const selectAlertMessage = createSelector(
  selectAlertState,
  state => state.message
);
