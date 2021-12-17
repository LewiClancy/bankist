import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordType: 'password' | 'text' = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  handleLogin() {
    this.store.dispatch(
      login({
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password'],
      })
    );
  }

  switchToSignup() {
    this.router.navigateByUrl('/auth/signup');
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
