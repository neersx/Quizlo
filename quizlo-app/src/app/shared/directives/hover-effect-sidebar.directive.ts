import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverEffectSidebar]',
  standalone : true
})
export class HoverEffectSidebarDirective {
  constructor(private eleRef: ElementRef, private render: Renderer2,
    private elementRef: ElementRef) {
    }
  @HostListener('mouseover') onHover() {
    if (window.innerWidth > 768) {
      this.elementRef.nativeElement.ownerDocument.documentElement?.setAttribute('data-icon-overlay', 'open');
    }    
  }
  @HostListener('mouseleave') onLeave() {
    if (window.innerWidth > 768) {
      this.elementRef.nativeElement.ownerDocument.documentElement?.removeAttribute('data-icon-overlay');
    }
  }
}
