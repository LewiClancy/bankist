import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{
    email: string;
    password: string;
  }>()
);

export const successfulLogin = createAction(
  '[Auth Effect] Login Successful',
  props<{ uid: string | undefined; email: string | undefined | null }>()
);

export const unsuccessfulLogin = createAction(
  '[Auth Effect] Login Not Successful',
  props<{ errorMessage: string }>()
);

export const signOut = createAction('[Navigation Bar] Sign Out');
