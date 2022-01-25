import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-start',
  template: `
    <h3>
      Please select a transaction to<br />
      view details.
    </h3>
  `,
  styles: [
    `
      :host {
        flex: 0 1 35%;
      }
    `,
  ],
})
export class TransactionsStartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
