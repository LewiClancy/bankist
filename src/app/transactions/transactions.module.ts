import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsStartComponent } from './transactions-start/transactions-start.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionDetailsComponent,
    TransactionsStartComponent,
    TransactionsListComponent,
  ],
  imports: [CommonModule, SharedModule, TransactionsRoutingModule],
})
export class TransactionsModule {}
