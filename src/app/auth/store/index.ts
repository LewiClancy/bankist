import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  uid: string | null;
  email: string | null;
}

export const initialState: AuthState = {
  uid: null,
  email: null,
};

export const authReducer = createReducer(
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
    uid: '',
    email: '',
  }))
);
