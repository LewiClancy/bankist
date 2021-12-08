import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss'],
})
export class LinkItemComponent implements OnInit {
  @Input()
  link!: string[];

  @Input()
  linkTitle!: string;

  constructor() {}

  ngOnInit(): void {}
}
