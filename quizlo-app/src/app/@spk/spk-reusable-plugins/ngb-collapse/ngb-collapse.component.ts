import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
interface CollapseItem {
  triggerText: string;
  bodyText: string;
  isCollapsed?: boolean; // Optional property to manage collapsed state
  targetId: string; // Unique ID for accessibility
}
@Component({
  selector: 'app-ngb-collapse',
  standalone: true,
  imports: [NgbModule,FormsModule,CommonModule],
  templateUrl: './ngb-collapse.component.html',
  styleUrl: './ngb-collapse.component.scss'
})
export class NgbCollapseComponent {
  @Input() items: any = [];
  
}
