import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-spk-products-reusable-card',
  standalone: true,
  imports: [NgbModule,RouterModule],
  templateUrl: './spk-products-reusable-card.component.html',
  styleUrl: './spk-products-reusable-card.component.scss'
})
export class SpkProductsReusableCardComponent {
  @Input() product: any;
}
