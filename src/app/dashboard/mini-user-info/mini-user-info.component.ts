import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AccountOwner } from 'src/app/core/models';

@Component({
  selector: 'app-mini-user-info',
  templateUrl: './mini-user-info.component.html',
  styleUrls: ['./mini-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniUserInfoComponent implements OnInit {
  @Input() ownerInfo: Partial<AccountOwner | null | undefined> = {};

  constructor() {}

  ngOnInit(): void {}
}
