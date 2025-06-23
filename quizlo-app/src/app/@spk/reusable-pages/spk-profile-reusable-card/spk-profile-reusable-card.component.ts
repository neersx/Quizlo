import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spk-profile-reusable-card',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './spk-profile-reusable-card.component.html',
  styleUrl: './spk-profile-reusable-card.component.scss'
})
export class SpkProfileReusableCardComponent {
  @Input() name: string='';
  @Input() email: string='';
  @Input() role: string='';
  @Input() avatar: string='';
  @Input() badgeClass: string='';
}
