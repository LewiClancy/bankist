import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlert from '../reducers/alert.reducer';

export const selectAlertState = createFeatureSelector<fromAlert.AlertState>(
  fromAlert.alertFeatureKey
);

export const selectHasAlert = createSelector(selectAlertState, state => {
  if (state.message) return true;
  else return false;
});

export const selectAlertMessage = createSelector(
  selectAlertState,
  state => state.message
);
