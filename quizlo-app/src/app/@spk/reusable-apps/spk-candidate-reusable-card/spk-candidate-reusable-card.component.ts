import { Component, Input } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-spk-candidate-reusable-card',
  standalone: true,
  imports: [NgbTooltipModule,RouterModule],
  templateUrl: './spk-candidate-reusable-card.component.html',
  styleUrl: './spk-candidate-reusable-card.component.scss'
})
export class SpkCandidateReusableCardComponent {
  @Input() candidate: any;
}
