import { Component, Input } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SpkDropdownsComponent } from '../../reusable-ui-elements/spk-dropdowns/spk-dropdowns.component';

@Component({
  selector: 'app-spk-kanbanboard-reusable-card',
  standalone: true,
  imports: [NgbDropdownModule, SpkDropdownsComponent, ],
  templateUrl: './spk-kanbanboard-reusable-card.component.html',
  styleUrl: './spk-kanbanboard-reusable-card.component.scss'
})
export class SpkKanbanboardReusableCardComponent {
  @Input() taskId!: string;
  @Input() idBg?: string;
  @Input() priorityBg?: string;
  @Input() taskTitle!: string;
  @Input() taskDescription!: string;
  @Input() taskPriority!: string;
  @Input() taskStatus!: string;
  @Input() taskBadges: any[] = [];
  @Input() likes!: number;
  @Input() comments!: number;
  @Input() avatars: string[] = [];
}
