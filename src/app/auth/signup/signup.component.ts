import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      sirName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', Validators.minLength(6)],
    });
  }
  //TODO Add validation to the form.
  //TODO Add address form array.

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  handleSubmit() {
    console.log(this.signupForm.value);
  }
}
