import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Account } from 'src/app/core/models';

@Component({
  selector: 'app-mini-summary',
  templateUrl: './mini-summary.component.html',
  styleUrls: ['./mini-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniSummaryComponent implements OnInit {
  @Input() accountInfo: Partial<Account | undefined | null> = {};

  constructor() {}

  ngOnInit(): void {}
}
