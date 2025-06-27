import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpkDropdownsComponent } from '../../reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';

@Component({
  selector: 'app-spk-search-jobs-reusable-card',
  standalone: true,
  imports: [NgbModule,SpkDropdownsComponent],
  templateUrl: './spk-search-jobs-reusable-card.component.html',
  styleUrl: './spk-search-jobs-reusable-card.component.scss'
})
export class SpkSearchJobsReusableCardComponent {
  @Input() job: any ;
  @Input() companyName: string = '';
  @Input() location: string = '';
  @Input() openings: number = 0;
  @Input() education: string = '';
  @Input() experience: string = '';
  @Input() jobType: string = '';
  @Input() buttonClass: string = '';
  @Input() locationClass: string = '';
  @Input() experienceClass: string = '';
  @Input() salaryRange: string = '';
  @Input() salary: string = '';
  @Input() imgSrc?: string = '';
  @Input() ngbDropdown: boolean = false;
  @Input() icons: boolean = false;
  @Input() icon?: boolean = false;
  @Input() buttonIcon?: boolean = false;
  @Input() iconbg?: string = '';



}
