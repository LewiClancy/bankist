import { createReducer, on } from '@ngrx/store';
import { AccountOwner } from 'src/app/core/models';
import * as authActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: AccountOwner | undefined;
}

export const initialState: AuthState = {
  user: undefined,
};

export const reducer = createReducer(
  initialState,

  on(authActions.loadUserInfoSuccess, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(authActions.signOut, state => ({
    ...state,
    user: undefined,
  }))
);
