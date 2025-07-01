import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-accordion',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './ngb-accordion.component.html',
  styleUrl: './ngb-accordion.component.scss'
})
export class NgbAccordionComponent {
  @Input() accordionId: string='';
  @Input() accodionClass: string='';
  @Input() closeOthers: boolean= false;
  @Input() accordionItems!: Array<{ title: string; body: string; headingId: string; collapseId: string; collapsed: boolean;accodionItemClass?:string  }>;
}
