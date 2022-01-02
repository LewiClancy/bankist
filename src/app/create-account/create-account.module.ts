import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [SharedModule, ReactiveFormsModule, CreateAccountRoutingModule],
})
export class CreateAccountModule {}
