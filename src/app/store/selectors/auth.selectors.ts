import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  return state.isAuthenticated;
});

export const selectUser = createSelector(selectAuthState, state => state.user);

export const selectUserId = createSelector(selectUser, state => state?.id);

export const selectUserEmail = createSelector(
  selectUser,
  state => state?.email
);

export const selectUserAddresses = createSelector(
  selectAuthState,
  state => state.userAddresses
);
