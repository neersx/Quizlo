import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-crypto-available-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-crypto-available-card.component.html',
  styleUrl: './spk-crypto-available-card.component.scss'
})
export class SpkCryptoAvailableCardComponent {
    @Input() title:string='' 
    @Input() available: string='';
    @Input() usdValue: string='';
    @Input() currencySymbol: string='';
    @Input() imgSrc: string='';
  buttons=[
    {
      class:"btn btn-primary-light btn-w-lg btn-wave flex-fill",
      text:"primary"
    },
    {
      class:"btn btn-success-light btn-w-lg btn-wave flex-fill",
      text:"primary"
    }
  ]
}
