import { Component, Input, OnInit } from '@angular/core';
import { AccountOwner, Address } from 'src/app/core/models';
import { UserInfoFormPresenter } from './user-info-form.presenter';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss'],
  providers: [UserInfoFormPresenter],
})
export class UserInfoFormComponent implements OnInit {
  @Input() set user(user: AccountOwner | undefined | null) {
    if (user) {
      this.userInfoPresenter.updateUserInfo(user);
    }
  }

  @Input() set addresses(addresses: Address[]) {
    this.userInfoPresenter.updateAddresses(addresses);
  }

  @Input() isEditable: boolean = false;

  constructor(public userInfoPresenter: UserInfoFormPresenter) {}

  ngOnInit(): void {}

  get addressControl() {
    return this.userInfoPresenter.addressControl;
  }

  onUpdateInfo() {
    console.log(this.userInfoPresenter.userInfoForm.value);
  }
}
