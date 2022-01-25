import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AddressResolver } from './addresses.resolver';
import { UserInfoComponent } from './user-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserInfoComponent,
    pathMatch: 'full',
    data: { editMode: false },
    resolve: { addresses: AddressResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: UserInfoComponent,
    data: { editMode: true },
    resolve: { addresses: AddressResolver },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoRoutingModule {}
