import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-nft-card-1',
  imports: [CommonModule],
  templateUrl: './spk-nft-card-1.component.html',
  styleUrl: './spk-nft-card-1.component.scss'
})
export class SpkNftCard1Component {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() valueChange: string = '';
  @Input() valueChangeClass: string = '';
  @Input() arrowDirection: string = '';
  @Input() iconClass: string = '';
  @Input() bgColor: string = '';
  @Input() iconPath: string = '';
  @Input() SvgPath: boolean = false
  @Input() SvgCircle: boolean = false

}
