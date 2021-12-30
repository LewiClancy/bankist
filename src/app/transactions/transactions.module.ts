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

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDetailsComponent,
    TransactionsStartComponent,
    TransactionsListComponent,
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
})
export class TransactionsModule {}
