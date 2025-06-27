import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spk-project-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spk-project-cards.component.html',
  styleUrl: './spk-project-cards.component.scss'
})
export class SpkProjectCardsComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() percentage: string = '';
  @Input() status: string = '';
  @Input() icon: string = '';
  @Input() iconBg: string = '';
  @Input() graph: string = '';

}
