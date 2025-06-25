import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-authentication-layout',
  standalone:false,
  templateUrl: './authentication-layout.component.html',
  styleUrl: './authentication-layout.component.scss'
})
export class AuthenticationLayoutComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,private elementRef: ElementRef,
    private renderer: Renderer2

  ) {  
      const htmlElement =
    this.elementRef.nativeElement.ownerDocument.documentElement;
  this.renderer.removeAttribute(htmlElement, 'data-nav-style', 'menu-click');
  this.renderer.removeAttribute(htmlElement, 'data-toggled', 'close');
  this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'vertical');
  this.renderer.removeAttribute(htmlElement, 'data-header-styles');
  this.renderer.removeAttribute(htmlElement, 'data-menu-styles');
  this.renderer.removeAttribute(htmlElement, 'data-width');
  this.renderer.removeAttribute(htmlElement, 'data-vertical-style');

}
ngOnDestroy(): void {
  this.renderer.removeClass(this.document.body, 'landing-body');
  const htmlElement =
  this.elementRef.nativeElement.ownerDocument.documentElement;
this.renderer.setAttribute(htmlElement, 'data-nav-layout', 'vertical');
this.renderer.removeAttribute(htmlElement, 'data-toggled');


}
}
