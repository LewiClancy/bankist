import { NgModule } from '@angular/core';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { UserInfoService } from './user-info.service';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressResolver } from './addresses.resolver';

@NgModule({
  declarations: [UserInfoComponent, UserInfoFormComponent],
  imports: [SharedModule, UserInfoRoutingModule, ReactiveFormsModule],
  providers: [UserInfoService, AddressResolver],
})
export class UserInfoModule {}
