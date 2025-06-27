import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-crypto-wallet-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-crypto-wallet-card.component.html',
  styleUrl: './spk-crypto-wallet-card.component.scss'
})
export class SpkCryptoWalletCardComponent {
  @Input() walletType: string = '';
  @Input() walletAddress: string = '';
  @Input() receivedAmount: number = 0;
  @Input() sentAmount: number = 0;
  @Input() totalAmount: number = 0;
  @Input() currency: string = 'BTC';
  @Input() imageUrl: string = '';

}
