import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressResolver } from './addresses.resolver';
import { UserInfoComponent } from './user-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserInfoComponent,
    pathMatch: 'full',
    data: { editMode: false },
    resolve: { addresses: AddressResolver },
  },
  {
    path: 'edit',
    component: UserInfoComponent,
    data: { editMode: true },
    resolve: { addresses: AddressResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInfoRoutingModule {}
