import { Action, DocumentSnapshot } from '@angular/fire/compat/firestore';

export function convertSnaps<T>(snapshot: Action<DocumentSnapshot<T>>): T {
  return <T>{ id: snapshot.payload.id, ...(<any>snapshot.payload.data()) };
}
