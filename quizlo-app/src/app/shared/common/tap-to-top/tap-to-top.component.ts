import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-tap-to-top',
  standalone:false,
  templateUrl: './tap-to-top.component.html',
  styleUrl: './tap-to-top.component.scss'
})
export class TapToTopComponent {
  public show: boolean = false;

  constructor(
    private viewScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
  }

  @HostListener("window:scroll", [])

  onWindowScroll(){
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 100) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  taptotop(){
    let body:any = document.querySelector('body')
    body.style. scrollBehavior = 'smooth';
    this.viewScroller.scrollToPosition([0,0]);
  }
}
