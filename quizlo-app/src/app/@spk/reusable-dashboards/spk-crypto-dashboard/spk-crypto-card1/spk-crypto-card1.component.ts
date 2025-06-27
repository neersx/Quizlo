import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-crypto-card1',
  imports: [CommonModule],
  templateUrl: './spk-crypto-card1.component.html',
  styleUrl: './spk-crypto-card1.component.scss'
})
export class SpkCryptoCard1Component {
  @Input() logoUrl: string = '';  // Image URL for the crypto logo
  @Input() cryptoName: string = '';  // Name of the cryptocurrency
  @Input() price: string = '';  // Price of the cryptocurrency
  @Input() percentageChange: string = '';  // Percentage change
  @Input() isPositive: boolean = true;
}
