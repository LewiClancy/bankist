import { createAction, props } from '@ngrx/store';
import { AccountOwner } from 'src/app/core/models';

export const login = createAction(
  '[Login Page] Login Request',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth Service] Login Successful',
  props<{ userId: string }>()
);

export const loginFailed = createAction(
  '[Auth Effect] Login Not Successful',
  props<{ errorCode: string }>()
);

export const setAuthStatus = createAction(
  '[Auth Service] Set Auth Status After Login Success',
  props<{ uid: string; email: string | null }>()
);

export const signOut = createAction('[Navigation Bar] Sign Out');

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
