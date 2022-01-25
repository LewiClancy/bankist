import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountOwner, Address } from 'src/app/core/models';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss'],
})
export class UserInfoFormComponent implements OnInit {
  @Input() user: AccountOwner | undefined | null = {
    id: '',
    firstName: '',
    surname: '',
    displayImage: undefined,
    email: '',
    accountId: '',
    dateOfBirth: {
      seconds: new Date().getSeconds(),
      nanoseconds: 0,
    },
  };

  @Input() addresses: Address[] = [];

  @Input() isEditable: boolean = false;

  userInfoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    if (!this.user) return;

    const milliseconds =
      this.user.dateOfBirth.seconds * 1000 + this.user.dateOfBirth.nanoseconds;

    this.userInfoForm = this.fb.group({
      id: [this.user.id, Validators.required],
      email: [this.user.email, [Validators.email, Validators.required]],
      firstName: [this.user.firstName, Validators.required],
      surname: [this.user.surname, Validators.required],
      dateOfBirth: [new Date(milliseconds), Validators.required],
      addresses: this.fb.array([]),
    });

    this.addresses.forEach(address => {
      const addressGroup = this.fb.group({
        city: [address.city, Validators.required],
        state: [address.state, Validators.required],
      });
      this.addressControl.push(addressGroup);
    });
  }

  get addressControl() {
    return this.userInfoForm.get('addresses') as FormArray;
  }

  onUpdateInfo() {
    console.log(this.userInfoForm.value);
  }
}
