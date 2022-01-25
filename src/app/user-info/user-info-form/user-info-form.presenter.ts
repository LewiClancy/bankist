import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountOwner, Address } from 'src/app/core/models';

@Injectable()
export class UserInfoFormPresenter {
  userInfoForm!: FormGroup;
  user!: AccountOwner;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.userInfoForm = this.fb.group({
      id: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      addresses: this.fb.array([]),
    });
  }

  updateUserInfo(user: AccountOwner) {
    this.user = user;
    const milliseconds =
      user.dateOfBirth.seconds * 1000 + user.dateOfBirth.nanoseconds;

    this.userInfoForm = this.fb.group({
      id: [user.id, Validators.required],
      email: [user.email, [Validators.email, Validators.required]],
      firstName: [user.firstName, Validators.required],
      surname: [user.surname, Validators.required],
      dateOfBirth: [new Date(milliseconds), Validators.required],
      addresses: this.fb.array([]),
    });
  }

  get addressControl() {
    return this.userInfoForm.get('addresses') as FormArray;
  }

  updateAddresses(addresses: Address[]) {
    //if the user has no registered addresses
    if (addresses.length === 0) {
      this.addressControl.push(
        this.fb.group({
          city: ['', Validators.required],
          state: ['', Validators.required],
        })
      );
    } else {
      addresses.forEach(address => {
        const addressGroup = this.fb.group({
          city: [address.city, Validators.required],
          state: [address.state, Validators.required],
        });
        this.addressControl.push(addressGroup);
      });
    }
  }
}
