import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-submit-loader',
  imports: [CommonModule],
  templateUrl: './form-submit-loader.html',
  styleUrl: './form-submit-loader.scss'
})
export class FormSubmitLoader {
  @Input() theme: 'light' | 'dark' | 'auto' = 'light';
  @Input() message: string = 'Submitting form...';
  @Input() submessage: string = 'Please wait while we process your request';
  @Input() isOverlay: boolean = true;
  @Input() spinnerType: 'default' | 'dots' | 'pulse' = 'default';
  @Input() showProgress: boolean = false;
  @Input() progress: number | null = null; // null for indeterminate
  @Input() showCancel: boolean = false;
  @Input() steps: string[] = [];
  @Input() currentStep: number = 0;

  onCancel(): void {
    // Emit cancel event - you can add Output() decorator for this
    console.log('Form submission cancelled');
  }
}
