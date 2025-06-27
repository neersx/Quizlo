import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-recommendations-card',
  imports: [CommonModule],
  templateUrl: './spk-recommendations-card.component.html',
  styleUrl: './spk-recommendations-card.component.scss'
})
export class SpkRecommendationsCardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() duration: string = '';
  @Input() plays: number = 0;
}
