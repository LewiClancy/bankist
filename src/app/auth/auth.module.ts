import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
})
export class AuthModule {}
