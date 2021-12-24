import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() message = 'Testing the alert component';

  @Input() type: 'success' | 'warning' = 'success';

  constructor() {}

  ngOnInit(): void {}

  onDismissAlert() {}

  getClass() {
    return this.type;
  }
}
