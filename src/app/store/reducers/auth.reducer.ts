import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  uid: string | undefined;
  email: string | null | undefined;
}

export const initialState: AuthState = {
  uid: undefined,
  email: undefined,
};

export const reducer = createReducer(
  initialState,
  on(authActions.setAuthStatus, (state: AuthState, { email, uid }) => {
    return {
      ...state,
      uid,
      email,
    };
  }),

  on(authActions.signOut, state => ({
    ...state,
    uid: '',
    email: '',
  }))
);
