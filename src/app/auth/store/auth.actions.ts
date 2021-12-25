import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login Request',
  props<{
    email: string;
    password: string;
  }>()
);

export const successfulLogin = createAction('[Auth Effect] Login Successful');

export const unsuccessfulLogin = createAction(
  '[Auth Effect] Login Not Successful',
  props<{ errorCode: string }>()
);

export const setAuthStatus = createAction(
  '[Auth Service] Set Auth Statues After Login Success',
  props<{ uid: string; email: string | null }>()
);

export const signOut = createAction('[Navigation Bar] Sign Out');
