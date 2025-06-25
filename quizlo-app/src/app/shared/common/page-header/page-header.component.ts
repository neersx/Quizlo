import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone:false,
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() firstTitle!: string;
  @Input() title!: string;
  @Input() title1!:string;
  @Input() activeTitle!: string;
}
