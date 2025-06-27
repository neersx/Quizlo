import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-categories-card',
  imports: [CommonModule],
  templateUrl: './spk-categories-card.component.html',
  styleUrl: './spk-categories-card.component.scss'
})
export class SpkCategoriesCardComponent {
  @Input() icon: string = ''; // Icon class
  @Input() label: string = ''; // Category label
  @Input() colorClass: string = ''; // Button color class
}
