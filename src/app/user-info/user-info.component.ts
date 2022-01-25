import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AccountOwner, Address } from '../core/models';
import { AppState } from '../store';
import { loadUserAddresses } from '../store/actions/auth.actions';
import { selectUser } from '../store/selectors/auth.selectors';

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
    private title: Title,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.title.setTitle('User Profile | Bankist');
    this.routeSub = this.route.data.subscribe(data => {
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
