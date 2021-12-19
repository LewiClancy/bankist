import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './index';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  if (state) {
    if (state.uid && state.email) return true;
  }
  return false;
});

export const selectUid = createSelector(selectAuthState, state => state?.uid);

export const selectEmail = createSelector(
  selectAuthState,
  state => state?.email
);
