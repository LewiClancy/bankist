import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent implements OnInit {
  @Input() isLoggedIn: boolean | null = false;

  @Output() signOut = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

}
