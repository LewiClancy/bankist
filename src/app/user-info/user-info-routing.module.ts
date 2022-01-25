import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressResolver } from './addresses.resolver';
import { UserInfoComponent } from './user-info.component';
import { UserInfoResolver } from './user-info.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserInfoComponent,
    pathMatch: 'full',
    data: { editMode: false },
    resolve: { userInfo: UserInfoResolver, addresses: AddressResolver },
  },
  {
    path: 'edit',
    component: UserInfoComponent,
    data: { editMode: true },
    resolve: { userInfo: UserInfoResolver, addresses: AddressResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoRoutingModule {}
