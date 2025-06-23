import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'spk-toast',
  standalone: true,
  imports: [NgbToastModule,CommonModule],
  templateUrl: './spk-toast.component.html',
  styleUrl: './spk-toast.component.scss'
})
export class SpkToastComponent {
  @Input() show = false; // Determines if the toast is visible
  @Input() title = ''; // Title of the toast
  @Input() content = ''; // Content of the toast
  @Input() header = ''; // Content of the toast
  @Input() buttonClass = ''; // Content of the toast
  @Input() toastImage = ''; // Content of the toast
  @Input() btnClass = ''; // Content of the toast
  @Input() content1 = ''; // Content of the toast
  @Input() autohide = false; // Autohide functionality
  @Output() hide = new EventEmitter<void>(); // Emit event when the toast is hidden
  @Output() closeToast = new EventEmitter<void>();

  onClose() {
    this.closeToast.emit();  // Emit an event when the button is clicked
  }
  onHide() {
    this.show = false;
    this.hide.emit();
  }
  
  show9 = true;
  hidden = () => {
    this.show9 = false;
  };
}
