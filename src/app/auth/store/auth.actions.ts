import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{
    email: string;
    password: string;
  }>()
);

export const successfulLogin = createAction('[Auth Effect] Login Successful');

export const unsuccessfulLogin = createAction(
  '[Auth Effect] Login Not Successful',
  props<{ errorMessage: string }>()
);

export const logout = createAction('[Navigation Bar] Logout');
