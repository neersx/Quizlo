import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'spk-school',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-school.component.html',
  styleUrl: './spk-school.component.scss'
})
export class SpkSchoolComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() changePercentage: string = '';
  @Input() plans: string = '';
  @Input() changeDirection: 'up' | 'down' = 'up';  // Enforcing the type to 'up' or 'down'
  @Input() backgroundColor: string = '';
  constructor(private sanitizer: DomSanitizer) {}
  getSanitizedSVG(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
}
}
