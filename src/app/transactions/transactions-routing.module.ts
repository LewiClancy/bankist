import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionsStartComponent } from './transactions-start/transactions-start.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TransactionsComponent,
    children: [
      { path: '', component: TransactionsStartComponent },
      {
        path: ':id',
        component: TransactionDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
