import { Component, Input } from '@angular/core';

@Component({
  selector: 'spk-landing-team-card',
  standalone: true,
  imports: [],
  templateUrl: './spk-landing-team-card.component.html',
  styleUrl: './spk-landing-team-card.component.scss'
})
export class SpkLandingTeamCardComponent {
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() image: string = '';
}
