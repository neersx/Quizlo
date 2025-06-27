import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-nft-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-nft-card.component.html',
  styleUrl: './spk-nft-card.component.scss'
})
export class SpkNftCardComponent {
  @Input() nft: any ;
}
