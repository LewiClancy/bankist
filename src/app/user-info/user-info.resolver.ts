import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AccountOwner, Address } from '../core/models';
import { AppState } from '../store';
import { selectUser } from '../store/selectors/auth.selectors';
import { UserInfoService } from './user-info.service';

@Injectable()
export class UserInfoResolver implements Resolve<{ user: AccountOwner }> {
  resolve(): Observable<{ user: AccountOwner }> | { user: AccountOwner } {
    return {
      user: this.userInfoService.testUser,
    };
  }

  constructor(
    private userInfoService: UserInfoService,
    private store: Store<AppState>
  ) {}
}
