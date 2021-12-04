import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-transactions',
  templateUrl: './mini-transactions.component.html',
  styleUrls: ['./mini-transactions.component.scss'],
})
export class MiniTransactionsComponent implements OnInit {
  dataSource = [
    {
      recipient: 'Lewis Ndungu',
      type: 'deposit',
      amount: '4000',
    },
    {
      recipient: 'Lewis Ndungu',
      type: 'withdrawal',
      amount: '4000',
    },
    {
      recipient: 'Lewis Ndungu',
      type: 'withdrawal',
      amount: '4000',
    },
    {
      recipient: 'Lewis Ndungu',
      type: 'deposit',
      amount: '4000',
    },
    {
      recipient: 'Lewis Ndungu',
      type: 'deposit',
      amount: '4000',
    },
    {
      recipient: 'Lewis Ndungu',
      type: 'deposit',
      amount: '4000',
    },
  ];

  columnsToDisplay = ['recipient', 'type', 'amount'];

  constructor() {}

  ngOnInit(): void {}
}
