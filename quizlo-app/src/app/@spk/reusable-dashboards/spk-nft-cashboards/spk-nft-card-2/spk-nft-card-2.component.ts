import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-nft-card-2',
  imports: [],
  templateUrl: './spk-nft-card-2.component.html',
  styleUrl: './spk-nft-card-2.component.scss'
})
export class SpkNftCard2Component {
  @Input() time: string = '';
  @Input() image: string = '';
  @Input() likes: string = '';
  @Input() title: string = '';
  @Input() avatar: string = '';
  @Input() creatorName: string = '';
  @Input() creatorHandle: string = '';
  @Input() bidAmount: string = '';
}
