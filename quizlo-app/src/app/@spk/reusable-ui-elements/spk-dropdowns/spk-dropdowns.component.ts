import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'spk-dropdowns',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './spk-dropdowns.component.html',
  styleUrl: './spk-dropdowns.component.scss'
})
export class SpkDropdownsComponent {
  @Input() bsPrefix?: string;
  @Input() as?: TemplateRef<any>;
  @Input() toggleas?: TemplateRef<any>;
  @Input() Menuas?: TemplateRef<any>;
  @Input() Align?: "start" | "end" | { sm: "start" | "end" } | { md: "start" | "end" } | { lg: "start" | "end" } | { xl: "start" | "end" } | { xxl: "start" | "end" };
  @Input() Menualign?: "start" | "end" | { sm: "start" | "end" } | { md: "start" | "end" } | { lg: "start" | "end" } | { xl: "start" | "end" } | { xxl: "start" | "end" };
  @Input() Customclass?: string;
  @Input() Customclass1?: string;
  @Input() Buttontext?: string;
  @Input() title?: string;
  @Input() Drop?: 'up' | 'up-centered' | 'start' | 'end' | 'down' | 'down-centered';
  @Input() Togglevariant?: string;
  @Input() Menulabel?: string;
  @Input() Menuclass?: string;
  @Input() Show?: boolean;
  @Input() Toggleshow?: boolean;
  @Input() Flip?: boolean;
  @Input() Menuvariant?: string;
  @Input() autoClose?: true | 'outside' | 'inside' | false;
  @Input() Id?: string;
  @Input() class?: string;
  @Input() iconPosition?: string;
  @Input() Imagetag?: boolean;
  @Input() Imagename?: string;
  @Input() Image?: boolean;
  @Input() Imagesrc?: string;
  @Input() Imageclass?: string;
  @Input() placement?: any ='';
  @Input() Icon?: boolean;
  @Input() IconBefore?: boolean;
  @Input() IconClass?: string;
  @Input() Toggletext?: string;
  @Input() color?: string;
  @Input() Buttonposition?: string;
  @Input() SvgClass?: string;
  @Input() Svgicon?: string;
  @Input() Badgecolor?: string;
  @Input() Badgepill?: boolean;
  @Input() Badgeid?: string;
  @Input() Active?: boolean;
  @Input() Badgetext?: string;
  @Input() Disabled?: boolean;
  @Input() Badgeclass?: string;
  @Input() splitTitle?: string;
  @Input() Buttontag?: boolean;
  @Input() Badgetag?: boolean;
  @Input() Split?: boolean;
  @Input() Arrowicon?: boolean;
  @Input() Svg?: boolean;
  @Input() splitbutton?: boolean;
  @Input() splitbuttonEnd?: boolean;
  @Input() splitbuttonClass?: string;
  @Input() Size?: 'sm' | 'lg';
  @Input() Navigate?: string;
  @Output() onTogglefunc = new EventEmitter<boolean>();
  @Output() onSelectfunc = new EventEmitter<string | null>();
  @Input() dropdownItems: Array<{ label: string, link?: string }> = [
    { label: 'Action', link: 'javascript:void(0);' },
    { label: 'Another action', link: 'javascript:void(0);' },
    { label: 'Something else here', link: 'javascript:void(0);' },
  ];
  toggleDropdown(isOpen: boolean) {
    this.onTogglefunc.emit(isOpen);
  }

  selectOption(eventKey: string | null, event: Event) {
    this.onSelectfunc.emit(eventKey);
  }
}
