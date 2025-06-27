import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-spk-reusable-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-reusable-card.component.html',
  styleUrl: './spk-reusable-card.component.scss'
})
export class SpkReusableCardComponent {
  @Input() card!: {

     value?: string ;
     graph?: string ;
     valueClass?: string ;
     percentage?: string ;
     colClass?: string ;
     cardClass?: string ;
     icon?: string ;
     bg?: string ;
     color?: string ;
     customClass?: string ;
     customClass1?: string ;
     titleClass?: string ;
     title?: string ;
     svgClass?: string ;
     percentageIcon?: string ;
    svg?: any; 
  };

  constructor(private sanitizer: DomSanitizer) {}
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  sanitizeIcon(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

}
