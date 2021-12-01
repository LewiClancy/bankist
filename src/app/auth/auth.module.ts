import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule],
  declarations: [LoginComponent, SignupComponent],
})
export class AuthModule {}
