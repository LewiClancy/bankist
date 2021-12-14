import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-start',
  template: ` <p>transactions-start works!</p> `,
  styles: [
    `
      :host {
        flex: 0 1 auto;
      }
    `,
  ],
})
export class TransactionsStartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
