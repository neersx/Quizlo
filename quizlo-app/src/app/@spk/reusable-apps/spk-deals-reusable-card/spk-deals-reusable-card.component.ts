import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spk-deals-reusable-card',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './spk-deals-reusable-card.component.html',
  styleUrl: './spk-deals-reusable-card.component.scss'
})
export class SpkDealsReusableCardComponent {
  @Input() avatarUrl: string = '';
  @Input() name: string = '';
  @Input() amountType: string = '';
  @Input() timestamp: string = '';
  @Input() companyName: string = '';
  @Input() amount: string = '';
  @Input() additionalCompanyName: string = '';
}
