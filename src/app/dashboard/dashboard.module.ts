import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MiniTransactionsComponent } from './mini-transactions/mini-transactions.component';
import { MiniSummaryComponent } from './mini-summary/mini-summary.component';
import { MiniUserInfoComponent } from './mini-user-info/mini-user-info.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    MiniTransactionsComponent,
    MiniSummaryComponent,
    MiniUserInfoComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    EffectsModule.forFeature([DashboardEffects]),
    StoreModule.forFeature(
      fromDashboard.dashboardFeatureKey,
      fromDashboard.DashboardReducer
    ),
  ],
})
export class DashboardModule {}
