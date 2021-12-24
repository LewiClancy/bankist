import { createAction, props } from '@ngrx/store';

export const setErrorMessage = createAction(
  '[Application] Set Error Message',
  props<{ message: string }>()
);

export const clearMesssage = createAction('[Application] Clear Message');
