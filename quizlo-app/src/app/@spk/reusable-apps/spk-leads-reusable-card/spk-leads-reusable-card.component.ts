import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spk-leads-reusable-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-leads-reusable-card.component.html',
  styleUrl: './spk-leads-reusable-card.component.scss'
})
export class SpkLeadsReusableCardComponent {
  @Input() title: string = '';
  @Input() count: string = '';
  @Input() iconClass: string = '';
  @Input() borderColor: string = '';
  @Input() badgeColor: string = '';
}
