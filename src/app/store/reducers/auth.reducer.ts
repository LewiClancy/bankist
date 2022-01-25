import { createReducer, on } from '@ngrx/store';
import { AccountOwner, Address } from 'src/app/core/models';
import * as authActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: AccountOwner | undefined;
  userAddresses: Address[] | undefined;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  userAddresses: undefined,
};

export const reducer = createReducer(
  initialState,

  on(authActions.loadUserInfoSuccess, (state, { user }) => {
    return {
      ...state,
      user,
    };
  }),
  on(authActions.setAuthentication, state => ({
    ...state,
    isAuthenticated: true,
  })),
  on(authActions.loadUserAddressesSuccess, (state, { userAddresses }) => {
    return {
      ...state,
      userAddresses,
    };
  }),
  on(authActions.resetAuthentication, state => ({
    // Logout
    ...state,
    isAuthenticated: false,
    user: undefined,
    userAddresses: undefined,
  }))
);
