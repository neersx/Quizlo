import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

interface Option {
  label: string; // Adjust according to your option structure
  value: any;    // Use the appropriate type based on your data
}
@Component({
  selector: 'spk-ng-select',
  standalone: true,
  imports: [NgSelectModule,FormsModule],
  templateUrl: './spk-ng-select.component.html',
  styleUrl: './spk-ng-select.component.scss'
})
export class SpkNgSelectComponent {
  @Input() options: any = []; // Options for the select
  @Input() defaultValue: any=[];   // Default value for the select
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
  @Output() change: EventEmitter<Option | Option[]> = new EventEmitter(); // Emit value change
  @Input() extraProps: any = {};
  // @Input() extraProps: { [key: string]: any } = {}; 
prop: any;
image: any;
@Output() selectedChange = new EventEmitter<any>(); // Emit changes in selection

onSelectionChange(selected: any): void {
  this.selectedChange.emit(selected);
}
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.applyAdditionalProperties();
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
    console.log('Selected Value:', event);
  }
}
