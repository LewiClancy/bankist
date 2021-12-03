import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MiniTransactionsComponent } from './mini-transactions/mini-transactions.component';
import { MiniSummaryComponent } from './mini-summary/mini-summary.component';
import { MiniUserInfoComponent } from './mini-user-info/mini-user-info.component';
import { SharedModule } from '../shared/shared.module';
import { LinkHoverDirective } from './link-hover-directive/link-hover.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    MiniTransactionsComponent,
    MiniSummaryComponent,
    MiniUserInfoComponent,
    LinkHoverDirective,
  ],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
