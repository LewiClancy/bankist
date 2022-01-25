import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  filter,
  first,
  Observable,
  skip,
  skipUntil,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { Address } from '../core/models';
import { AppState } from '../store';
import { loadUserAddresses } from '../store/actions/auth.actions';
import { selectUserAddresses } from '../store/selectors/auth.selectors';

@Injectable()
export class AddressResolver implements Resolve<Address[] | undefined> {
  resolve(): Observable<Address[] | undefined> {
    this.store.dispatch(loadUserAddresses());
    return this.store.select(selectUserAddresses).pipe(
      filter(add => add !== undefined),
      first()
    );
  }

  constructor(private store: Store<AppState>) {}
}
