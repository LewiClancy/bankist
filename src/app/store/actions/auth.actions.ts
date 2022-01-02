import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login Request',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction('[Auth Effect] Login Successful');

export const loginFailed = createAction(
  '[Auth Effect] Login Not Successful',
  props<{ errorCode: string }>()
);

export const setAuthStatus = createAction(
  '[Auth Service] Set Auth Status After Login Success',
  props<{ uid: string; email: string | null }>()
);

export const signOut = createAction('[Navigation Bar] Sign Out');
