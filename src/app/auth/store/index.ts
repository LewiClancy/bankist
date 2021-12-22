import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  uid: string | undefined;
  email: string | undefined | null;
}

export const initialState: AuthState = {
  uid: undefined,
  email: undefined,
};

export const reducer = createReducer(
  initialState,
  on(authActions.successfulLogin, (state: AuthState, { email, uid }) => {
    return {
      ...state,
      uid,
      email,
    };
  }),

  on(authActions.signOut, state => ({
    ...state,
    uid: undefined,
    email: undefined,
  }))
);
