import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/auth.actions';

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
    private store: Store,
    titleService: Title
  ) {
    titleService.setTitle('Login | Bankist');
  }

  ngOnInit(): void {
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(emailRegex)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    this.store.dispatch(
      login({
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password'],
      })
    );
  }

  onSwitchToSignup() {
    this.router.navigateByUrl('/auth/signup');
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
