import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models';

@Component({
  selector: 'app-mini-summary',
  templateUrl: './mini-summary.component.html',
  styleUrls: ['./mini-summary.component.scss'],
})
export class MiniSummaryComponent implements OnInit {
  @Input() accountInfo: Partial<Account> | null = {};

  constructor() {}

  ngOnInit(): void {}
}
