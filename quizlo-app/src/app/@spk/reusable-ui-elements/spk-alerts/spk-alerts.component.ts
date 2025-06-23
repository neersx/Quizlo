import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'spk-alerts',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './spk-alerts.component.html',
  styleUrl: './spk-alerts.component.scss'
})
export class SpkAlertsComponent {
  @Input() isDismissible = false; 
  @Input() variant:string = ''; 
  @Output() close = new EventEmitter<void>(); 
  @Input() title: string = ''; 
  @Input() linkText: string = ''; 
  @Input() buttonClass: string = ''; 


  onClose() {
    this.close.emit(); // Emit close event
  }
}
