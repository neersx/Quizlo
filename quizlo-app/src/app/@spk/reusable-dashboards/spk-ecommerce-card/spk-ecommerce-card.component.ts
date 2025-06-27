import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-ecommerce-card',
  imports: [CommonModule],
  templateUrl: './spk-ecommerce-card.component.html',
  styleUrl: './spk-ecommerce-card.component.scss'
})
export class SpkEcommerceCardComponent {
  @Input() title!: string;
  @Input() value!: string;
  @Input() percentageChange!: string;
  @Input() changeDirection!: 'increase' | 'decrease';
  @Input() iconSvg!: string;
  @Input() avatarBgClass!: string;
}
