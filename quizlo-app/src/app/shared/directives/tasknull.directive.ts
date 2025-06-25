import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTaskNull]'
})
export class TaskNullDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.checkIfEmpty();
  }

  private checkIfEmpty() {
    const element = this.el.nativeElement;

    if (element.children.length === 0) {
      this.renderer.addClass(element, 'task-Null');
    } else {
      this.renderer.removeClass(element, 'task-Null');
    }
  }
}