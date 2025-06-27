import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../apex-chart/apex-chart.component';

@Component({
  selector: 'spk-hrm-dashboard',
  imports: [CommonModule,ApexChartComponent],
  templateUrl: './spk-hrm-dashboard.component.html',
  styleUrl: './spk-hrm-dashboard.component.scss'
})
export class SpkHrmDashboardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() percentage: string = '';
  @Input() chartOptions: any;
  @Input() isIncrease: boolean = true; 
}
