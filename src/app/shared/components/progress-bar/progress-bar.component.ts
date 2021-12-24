import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { selectIsLoading } from 'src/app/store/selectors/loading.selectors';

@Component({
  selector: 'app-progress-bar',
  template: `
    <mat-progress-bar
      mode="indeterminate"
      *ngIf="isLoading$ | async"
    ></mat-progress-bar>
  `,
})
export class ProgressBarComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
  }
}
