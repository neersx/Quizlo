import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { After } from 'v8';

export interface OptionModel {
  label: string; // Adjust according to your option structure
  value: any;    // Use the appropriate type based on your data
  code?: string;
}
@Component({
  selector: 'spk-ng-select',
  imports: [CommonModule, NgSelectModule,FormsModule, ReactiveFormsModule],
  templateUrl: './spk-ng-select.component.html',
  styleUrl: './spk-ng-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpkNgSelectComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() options: any = []; // Options for the select
  @Input() defaultValue: OptionModel | undefined;   // Default value for the select
  @Input() id: string='';       // Additional classes
  @Input() mainClass: string='';       // Additional classes
  @Input() maxSelectedItems!: number;       // Additional classes
  @Input() selectClass: string='';       // Additional classes
  @Input() disabled: boolean = false; // Disable the select
  @Input() clearable?: boolean = true; // Allow clearing of selection
  @Input() multiple?: boolean = false;   // Enable multiple selection
  @Input() multi?: boolean = false;   // Enable multiple selection
  @Input() searchable?: boolean = true; // Enable searching
  @Input() hideSelected: boolean = true; // Enable searching
  @Input() placeholder: string = ''      // Placeholder text
  @Input() additionalProperties: { [key: string]: any } = {};
  @Output() change: EventEmitter<OptionModel | OptionModel[]> = new EventEmitter(); // Emit value change
  @Input() extraProps: any = {};
  @Input() message: string = '';
  @Input() messageType: 'success' | 'error' | 'warning' | 'info' | 'default' = 'default';
  // @Input() extraProps: { [key: string]: any } = {}; 
prop: any;
image: any;
@Output() selectedChange = new EventEmitter<any>(); // Emit changes in selection

onSelectionChange(selected: any): void {
  this.selectedChange.emit(selected);
}
  constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) {
   
  }

  ngOnInit(): void {
    this.defaultValue = this.defaultValue || { label: this.placeholder, value: null };
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.applyAdditionalProperties();
    this.cdr.detectChanges();
  }

  compareByValue(a: any, b: any): boolean {
    return a?.value === b?.value;
  }

  ngOnChanges(changes: any) {
    if (changes.defaultValue && !changes.defaultValue.firstChange) {
      // re-assign so ngModel picks it up
      this.defaultValue = changes.defaultValue.currentValue;
      this.cdr.detectChanges();
    }
  }

  // Apply additional properties using Renderer2
  private applyAdditionalProperties() {
    const selectElement = this.el.nativeElement.querySelector('ng-select');

    if (selectElement && this.additionalProperties) {
      Object.keys(this.additionalProperties).forEach(prop => {
        const value = this.additionalProperties[prop];
        if (this.isValidAttributeName(prop)) {
          this.renderer.setAttribute(selectElement, prop, value);
        }
      });
    }
  }

  // Example attribute validation
  isValidAttributeName(name: string): boolean {
    const invalidCharacters = [' ', '|', ':', '/', '\\', ';', ','];
    return !invalidCharacters.some(char => name.includes(char));
  }

  onValueChange(event: any) {
    this.change.emit(event);
  }

  getMessageClass() {
    switch (this.messageType) {
      case 'success':
        return ' text-success';
      case 'error':
        return ' text-danger';
      case 'warning':
        return ' text-warning';
      case 'info':
        return ' text-info';
      default:
        return ' text-default';
    }
  }

  getMessageIcon() {
    switch (this.messageType) {
      case 'success':
        return '✔️'; // Or Font Awesome class: 'fa fa-check-circle text-success'
      case 'error':
        return '❌'; // Or: 'fa fa-times-circle text-danger'
      case 'warning':
        return '⚠️'; // Or: 'fa fa-exclamation-triangle text-warning'
      case 'info':
        return 'ℹ️'; // Or: 'fa fa-info-circle text-info'
      default:
        return '💬'; // Or: 'fa fa-comment-alt text-secondary'
    }
  }
}
