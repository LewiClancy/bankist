import { createAction } from '@ngrx/store';

export const startLoading = createAction(
  '[Application] Start the loading spinner'
);
export const stopLoading = createAction(
  '[Application] Stop the loading spinner'
);
