import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLinkHover]',
})
export class LinkHoverDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.toggleElevationOnHover('mouseenter');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.toggleElevationOnHover('mouseleave');
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private toggleElevationOnHover(state: string) {
    if (state === 'mouseenter') {
      this.renderer.addClass(this.el.nativeElement, 'mat-elevation-z2');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'mat-elevation-z2');
    }
  }
}
