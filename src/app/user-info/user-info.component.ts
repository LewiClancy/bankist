import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { AccountOwner, Address } from '../core/models';
import { AppState } from '../store';
import { loadUserAddresses } from '../store/actions/auth.actions';
import {
  selectUser,
  selectUserAddresses,
} from '../store/selectors/auth.selectors';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  user$!: Observable<AccountOwner | undefined>;
  addresses!: Address[];

  routeSub!: Subscription;

  inEditMode = true;

  constructor(
    private route: ActivatedRoute,
    title: Title,
    private store: Store<AppState>
  ) {
    title.setTitle('User Profile | Bankist');
  }

  ngOnInit(): void {
    this.routeSub = this.route.data
      .pipe(tap(data => console.log(data)))
      .subscribe(data => {
        this.inEditMode = data['editMode'];
        this.addresses = data['addresses'];
      });

    this.user$ = this.store.select(selectUser);
    this.store.dispatch(loadUserAddresses());
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
