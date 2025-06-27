import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../apex-chart/apex-chart.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'spk-sales-card',
  imports: [CommonModule,ApexChartComponent],
  templateUrl: './spk-sales-card.component.html',
  styleUrl: './spk-sales-card.component.scss'
})
export class SpkSalesCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() percentage: string = '';
  @Input() chartOptions: any = null;
  @Input() chartId: string = '';
  @Input() icon: string = '';
  @Input() iconBgColor: string = '';
  @Input() trend: string = '';
  @Input() trendColor: string = '';
  constructor( private sanitizer: DomSanitizer) {}

  sanitizeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  } 
}
