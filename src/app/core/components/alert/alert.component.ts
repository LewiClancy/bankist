import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import * as alertSelectors from 'src/app/store/selectors/alert.selectors';
import * as alertActions from 'src/app/store/actions/alert.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  displayAlert$!: Observable<boolean>;
  message$!: Observable<string | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.displayAlert$ = this.store.select(alertSelectors.selectHasAlert);
    this.message$ = this.store.select(alertSelectors.selectAlertMessage);
  }

  onDismissAlert() {
    this.store.dispatch(alertActions.clearMesssage());
  }
}
