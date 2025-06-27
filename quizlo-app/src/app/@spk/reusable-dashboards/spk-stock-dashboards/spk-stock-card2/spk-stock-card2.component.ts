import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../../apex-chart/apex-chart.component';

@Component({
  selector: 'spk-stock-card2',
  imports: [CommonModule,ApexChartComponent],
  templateUrl: './spk-stock-card2.component.html',
  styleUrl: './spk-stock-card2.component.scss'
})
export class SpkStockCard2Component {
   @Input() companyName: string = '';
    @Input() companyIcon: string = '';
    @Input() currentValue: number = 0;
    @Input() percentageChange: number = 0;
    @Input() chartOptions: any;  // Adjust this type as per the chart options being used
    @Input() companySymbol: string = '';
    @Input() companyFullName: string = '';
    @Input() iconBg: string = '';
}
