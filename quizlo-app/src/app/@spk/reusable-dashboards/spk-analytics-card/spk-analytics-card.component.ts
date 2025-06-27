import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../apex-chart/apex-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spk-analytics-card',
  standalone: true,
  imports: [ApexChartComponent,CommonModule],
  templateUrl: './spk-analytics-card.component.html',
  styleUrl: './spk-analytics-card.component.scss'
})
export class SpkAnalyticsCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() percentageChange: string = '';
  @Input() changeDirection: 'increase' | 'decrease' = 'increase';
  @Input() chartOptions: any = {};
  @Input() iconClass: string = '';
  @Input() avatarBgClass: string = '';
}
