import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './index';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  if (state && state.uid && state.email) return true;
  else return false;
});

export const selectUserUid = createSelector(
  selectAuthState,
  state => state?.uid
);

export const selectEmail = createSelector(
  selectAuthState,
  state => state?.email
);
