import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'spk-poscard',
  standalone: true,
  imports: [CommonModule,NgbOffcanvasModule],
  templateUrl: './spk-poscard.component.html',
  styleUrl: './spk-poscard.component.scss'
})
export class SpkPoscardComponent {
  @Input() name!: string;
  @Input() category!: string;
  @Input() price!: number;
  @Input() image!: string;
  @Input() description!: string;
  @Input() isOutOfStock: boolean = false;  // For "out-of-stock" feature
  @Input() offcanvasClick: any;
  @Output() onClick: EventEmitter<void> = new EventEmitter();
  buttonAction() {
    this.onClick.emit(); // Emit the click event
  }
 
}
