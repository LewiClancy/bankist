import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MiniTransactionsComponent } from './mini-transactions/mini-transactions.component';
import { MiniSummaryComponent } from './mini-summary/mini-summary.component';
import { MiniUserInfoComponent } from './mini-user-info/mini-user-info.component';
import { DashboardLinkComponent } from './dashboard-link/dashboard-link.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MiniTransactionsComponent,
    MiniSummaryComponent,
    MiniUserInfoComponent,
    DashboardLinkComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
