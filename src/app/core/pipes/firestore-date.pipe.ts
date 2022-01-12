import { Pipe, PipeTransform } from '@angular/core';

interface FireTime {
  seconds: number;
  nanoseconds: number;
}

@Pipe({
  name: 'firestoreDate',
})
export class FirestoreDatePipe implements PipeTransform {
  transform(value: FireTime): any {
    const microSeconds = value.seconds * 1000 + value.nanoseconds;
    const date = new Date(microSeconds).toDateString();
    return date;
  }
}
