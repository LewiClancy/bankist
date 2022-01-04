import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authFeatureKey
);

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  return state.user ? true : false;
});

export const selectLoggedInUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectUserUid = createSelector(
  selectLoggedInUser,
  state => state?.id
);

export const selectUserEmail = createSelector(
  selectLoggedInUser,
  state => state?.email
);
