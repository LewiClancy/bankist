import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  return state.user ? true : false;
});

export const selectUserUid = createSelector(
  selectAuthState,
  state => state.user?.id
);

export const selectAccountId = createSelector(
  selectAuthState,
  state => state.user?.accountId
);

export const selectUserEmail = createSelector(
  selectAuthState,
  state => state.user?.email
);
