import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  passwordFieldType: 'password' | 'text' = 'password';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', Validators.minLength(6)],
      addresses: this.fb.array([this.fb.control('')]),
    });
  }
  //TODO Add validation to the form.

  get addresses() {
    return this.signupForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.fb.control(''));
  }

  removeAdress(index: number) {
    this.addresses.removeAt(index);
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  handleRegistration() {
    console.log(this.signupForm.value);
  }
}
