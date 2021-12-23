import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './store';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
  ],
  declarations: [LoginComponent, SignupComponent, AuthComponent],
})
export class AuthModule {}
