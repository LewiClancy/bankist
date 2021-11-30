import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[auto-focus]',
})
export class AutofocusDirective implements AfterContentInit {
  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    this.el.nativeElement.focus();
  }
}
