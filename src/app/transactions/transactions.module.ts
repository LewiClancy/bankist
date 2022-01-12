import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsStartComponent } from './transactions-start/transactions-start.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTransactions from './store';
import { TransactionsEffects } from './store/transactions.effects';
import { FirestoreDatePipe } from '../core/pipes/firestore-date.pipe';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDetailsComponent,
    TransactionsStartComponent,
    TransactionsListComponent,
    FirestoreDatePipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromTransactions.transactionsFeatureKey,
      fromTransactions.transactionsReducer
    ),
    EffectsModule.forFeature([TransactionsEffects]),
  ],
  providers: [FirestoreDatePipe],
})
export class TransactionsModule {}
