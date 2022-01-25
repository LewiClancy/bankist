import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'transactions',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./transactions/transactions.module').then(
        m => m.TransactionsModule
      ),
  },
  {
    path: 'create-account',
    loadChildren: () =>
      import('./create-account/create-account.module').then(
        m => m.CreateAccountModule
      ),
  },
  {
    path: 'user-info',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./user-info/user-info.module').then(m => m.UserInfoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
