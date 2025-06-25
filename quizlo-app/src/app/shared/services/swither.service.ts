
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SwitherService {
  
  constructor() {}
  private emitChangeSource = new Subject<any>();
  changeEmitted = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  private emitHoverChangeSource = new Subject<any>();
  changeHoverEmitted = this.emitHoverChangeSource.asObservable();
  emitHoverChange(change: any) {
    this.emitHoverChangeSource.next(change);
  }

  private contentSubject = new BehaviorSubject<string>(''); // You can replace string with the type of your content
  content$ = this.contentSubject.asObservable();

  updateContent(content: string) {
    this.contentSubject.next(content);
  }
 
}
