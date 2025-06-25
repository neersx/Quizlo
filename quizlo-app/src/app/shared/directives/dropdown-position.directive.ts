import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import {Menu, NavService } from '../services/navservice';

@Directive({
  selector: '[appDropdownPosition]',
  standalone: true
})
export class DropdownPositionDirective {

  public menuItems!: Menu[];
  public menuitemsSubscribe$!: Subscription;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private navServices: NavService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setPosition();
  }

  ngOnInit() {

    this.menuitemsSubscribe$ = this.navServices.items.subscribe((items: any) => {
      this.menuItems = items;
    });
    this.setPosition();
  }

  clearNavDropdown() {
    this.menuItems?.forEach((a: any) => {
      a.active = false;
      a?.children?.forEach((b: any) => {
        b.active = false;
        b?.children?.forEach((c: any) => {
          c.active = false;
        });
      });
    });
  }
  
  setPosition() {
    let dropdownElement = this.elementRef.nativeElement as HTMLElement;
    if (dropdownElement.parentElement?.classList.contains('child1') && dropdownElement.parentElement?.classList.contains('active')) {
      const rect = dropdownElement.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        return this.clearNavDropdown()
      }
    }
    if (dropdownElement.classList.contains('open')) {
      let dropdownElementUl = dropdownElement.querySelector('ul') as HTMLElement;
      if(dropdownElementUl){
      var dropdownRect = dropdownElement.getBoundingClientRect();
      var dropdownWidth = dropdownElementUl.getBoundingClientRect().width;

      // Calculate the right edge position
      var rightEdge = dropdownRect.right + dropdownWidth;
      var leftEdge = dropdownRect.left - dropdownWidth;
      if (rightEdge > window.innerWidth) {
        dropdownElementUl.classList.add('force-left');
      } else {
        if (dropdownElement.closest('ul')?.classList.contains('force-left') && leftEdge > 0) {
          dropdownElementUl.classList.add('force-left');
        }
        // Check if moving out to the left
        else if (leftEdge < 0) {
          dropdownElementUl.classList.remove('force-left');
        } else {
          // Reset classes and position if not moving out
          dropdownElementUl.classList.remove('force-left');
        }
      }
    }
  }
  }

  ngOnDestroy() {
    this.menuitemsSubscribe$.unsubscribe();
  }
}
