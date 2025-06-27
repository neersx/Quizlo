import { Component, Input } from '@angular/core';
import { ApexChartComponent } from '../../apex-chart/apex-chart.component';
interface CryptoCardData {
  name: string;
  symbol: string;
  rank: number;
  price: string;
  volumeChange: string;
  marketCap: string;
  chartOptions: any; // Define the appropriate type for chart options
  imageUrl: string;
}

@Component({
  selector: 'app-spk-crypto-marketcap-reusable-card',
  standalone: true,
  imports: [ApexChartComponent],
  templateUrl: './spk-crypto-marketcap-reusable-card.component.html',
  styleUrl: './spk-crypto-marketcap-reusable-card.component.scss'
})
export class SpkCryptoMarketcapReusableCardComponent {
@Input() crypto:any;
}
