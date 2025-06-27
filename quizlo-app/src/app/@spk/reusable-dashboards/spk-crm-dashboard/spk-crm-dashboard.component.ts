import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../apex-chart/apex-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spk-crm-dashboard',
  imports: [ApexChartComponent,CommonModule],
  templateUrl: './spk-crm-dashboard.component.html',
  styleUrl: './spk-crm-dashboard.component.scss'
})
export class SpkCrmDashboardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() percentageChange!: string;
  @Input() isIncrease!: boolean;
  @Input() chartOptions!: any;
  @Input() icon!: string;
  @Input() iconColor!: string;
  @Input() BgColor!: string;
}
