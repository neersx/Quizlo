import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'spk-medical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-medical.component.html',
  styleUrl: './spk-medical.component.scss'
})
export class SpkMedicalComponent {
  @Input() iconBgColor: string = '';
  @Input() roundBgClass: string = '';
  @Input() iconSvg: string = '';
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() change: number = 0;
  @Input() changePercentage: number = 0;
  @Input() label: string = '';
  constructor(private sanitizer: DomSanitizer) {}
  getSanitizedSVG(iconSvg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(iconSvg);
}
}
