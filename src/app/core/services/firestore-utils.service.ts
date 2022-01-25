import { Action, DocumentSnapshot } from '@angular/fire/compat/firestore';

export function convertSnaps<T>(snapshot: Action<DocumentSnapshot<T>>): T {
  return <T>{ id: snapshot.payload.id, ...(<any>snapshot.payload.data()) };
}

export function getErrorMessage(errCode: string): string {
  let message = 'Login Failed: An unknown error occured';

  switch (errCode) {
    case 'auth/wrong-password':
      message = 'Login Failed: The password you entered is invalid.';
      break;

    case 'auth/user-not-found':
      message = 'Login Failed: The email you entered is invalid.';
      break;

    case 'auth/too-many-requests':
      message =
        'Your account has been blocked due to too many login attempts. Reset your password or try again later.';
      break;

    case 'auth/network-request-failed':
      message =
        'Login Failed: Please check your internet connection or refresh this page.';
      break;
  }

  return message;
}
