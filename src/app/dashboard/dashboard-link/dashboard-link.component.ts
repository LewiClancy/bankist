import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-link',
  templateUrl: './dashboard-link.component.html',
  styleUrls: ['./dashboard-link.component.scss'],
})
export class DashboardLinkComponent implements OnInit {
  @Input()
  linkTo!: string;

  constructor() {}

  ngOnInit(): void {}
}
