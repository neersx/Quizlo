import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spk-pricing-reusable-card',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './spk-pricing-reusable-card.component.html',
  styleUrl: './spk-pricing-reusable-card.component.scss'
})
export class SpkPricingReusableCardComponent {
  @Input() title: string = '';
  @Input() mainClass?: string = '';
  @Input() arrowClass?: string = '';
  @Input() borderClass?: string = '';
  @Input() priceClass?: string = '';
  @Input() bodyClass?: string = '';
  @Input() footerClass?: string = '';
  @Input() buttonClass?: string = '';
  @Input() textColor?: string = '';
  @Input() price: string = '';
  @Input() pricingPlan: string = '';
  @Input() description: string = '';
  @Input() features: Array<{ text: string, badge?: string,badgeClass?:string,icon?:string }> = [];
  @Input() isPopular: boolean = false;
}
