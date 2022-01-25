import { Injectable } from '@angular/core';
import { AccountOwner, Address } from '../core/models';

@Injectable()
export class UserInfoService {
  private _testUser: AccountOwner = {
    id: 'itslewisndungu',
    firstName: 'Lewis',
    surname: 'Ngigi',
    displayImage: '../../assets/images/image-jeremy.png',
    email: 'lewisndungu@gmail.com',
    accountId: '434354332',
    dateOfBirth: {
      seconds: Math.floor(new Date(2001, 4, 9).getTime() / 1000),
      nanoseconds: 0,
    },
  };

  private _testUserAddresses: Array<Address> = [
    {
      city: 'Nairobi',
      state: 'Kenya',
    },
  ];

  constructor() {}

  get testUser() {
    return this._testUser;
  }

  get testUserAddresses() {
    return this._testUserAddresses;
  }
}
