import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../../apex-chart/apex-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spk-crypto-card2',
  imports: [ApexChartComponent,CommonModule],
  templateUrl: './spk-crypto-card2.component.html',
  styleUrl: './spk-crypto-card2.component.scss'
})
export class SpkCryptoCard2Component {
  @Input() logoUrl: string = '';  // Image URL for the crypto logo
  @Input() cryptoName: string = '';  // Name of the cryptocurrency
  @Input() cryptoSymbol: string = '';  // Symbol of the cryptocurrency
  @Input() priceChange: string = '';  // Percentage change
  @Input() value: string = '';  // Value of the cryptocurrency
  @Input() usdPrice: string = '';  // USD price equivalent
  @Input() chartOptions: any;
  @Input() textColor: string = '';  // Percentage change

}
