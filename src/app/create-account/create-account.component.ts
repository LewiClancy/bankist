import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class CreateAccountComponent implements OnInit {
  signupForm!: FormGroup;
  passwordFieldType: 'password' | 'text' = 'password';
  constructor(private fb: FormBuilder, title: Title) {
    title.setTitle('Create Account | Bankist');
  }
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
