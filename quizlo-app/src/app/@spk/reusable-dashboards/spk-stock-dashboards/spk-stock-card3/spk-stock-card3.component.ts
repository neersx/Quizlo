import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface MarketIndex {
  name: string;
  value: number;
  changePercentage: number;
  changeAmount: number;
  icon: string; // Icon for trending up or down
  iconColor: string; // Color for the icon (primary, danger)
}
@Component({
  selector: 'spk-stock-card3',
  imports: [CommonModule],
  templateUrl: './spk-stock-card3.component.html',
  styleUrl: './spk-stock-card3.component.scss'
})
export class SpkStockCard3Component {
  @Input() marketIndex!: MarketIndex | any;
}
