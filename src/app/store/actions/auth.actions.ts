import { createAction, props } from '@ngrx/store';
import { AccountOwner } from 'src/app/core/models';

export const login = createAction(
  '[Login Page] User Login Request',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth Effects] User Login Successful',
  props<{ userId: string }>()
);

export const autoLoginSuccess = createAction(
  '[Auth Service] User Login Successful',
  props<{ userId: string }>()
);

export const loginFailed = createAction(
  '[Auth Effect] User Login Not Successful',
  props<{ errorCode: string }>()
);

export const loadUserInfo = createAction(
  '[Auth Effect] Load user information ',
  props<{ userId: string }>()
);

export const loadUserInfoSuccess = createAction(
  '[Auth Effect] Load user information success',
  props<{ user: AccountOwner }>()
);

export const loadUserInfoFailed = createAction(
  '[Auth Effect] Load user information failed',
  props<{ errorCode: string }>()
);

export const signOut = createAction('[Navigation Bar] Sign Out');

export const setAuthentication = createAction(
  '[Auth Service] Set authenticated to true on login'
);

export const resetAuthentication = createAction(
  '[Auth Service] Set authenticated to false on logout'
);
