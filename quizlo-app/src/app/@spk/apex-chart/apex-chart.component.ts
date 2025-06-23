import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'spk-apexcharts',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './apex-chart.component.html',
  styleUrl: './apex-chart.component.scss'
})
export class ApexChartComponent {
  @Input() chartOptions: any;  // Accept chart options as input

  constructor() { }

  ngOnInit(): void {
  }
}
