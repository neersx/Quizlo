import { Directive, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appToggleBtn]',
  standalone: true
})
export class ToggleBtnDirective {
  // used in form Element component
  constructor( private element: ElementRef) { }
  
  ngOnInit(){
    fromEvent(this.element.nativeElement, 'click').subscribe(() => {
      //toogle on/off
      this.element.nativeElement.classList.toggle('on')
    });
  }

}
