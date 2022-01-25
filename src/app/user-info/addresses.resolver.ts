import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  filter,
  Observable,
  skip,
  skipUntil,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { AccountOwner, Address } from '../core/models';
import { AppState } from '../store';
import { loadUserAddresses } from '../store/actions/auth.actions';
import {
  selectUser,
  selectUserAddresses,
} from '../store/selectors/auth.selectors';
import { UserInfoService } from './user-info.service';

@Injectable()
export class AddressResolver implements Resolve<Address[] | undefined> {
  resolve(): Observable<Address[] | undefined> {
    this.store.dispatch(loadUserAddresses());
    return this.store.select(selectUserAddresses).pipe(
      filter(add => add !== undefined),
      take(1),
      tap(add => console.log(add))
    );
  }

  constructor(private store: Store<AppState>) {}
}
