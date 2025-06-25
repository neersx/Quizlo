import { ChangeDetectorRef, Component, ElementRef, Renderer2, inject } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-switcher',
  standalone:false,
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
})
export class SwitcherComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  active = 1;
  public localdata: any 
  constructor(
    private elementRef: ElementRef,
    private appStateService: AppStateService,
    private renderer: Renderer2,
  ) {
    this.appStateService.state$.subscribe(state => {
      this.localdata = state;
    });
  }


  updateDirection(direction: string) {
    this.appStateService.updateState({ direction });

  }

  updateTheme(theme: string) {
    this.appStateService.updateState({ theme, menuColor: theme, headerColor: theme });
    if (theme == 'light') {
      this.appStateService.updateState({ theme, themeBackground: '', headerColor: 'light', menuColor: 'light' });
      let html = document.querySelector('html');
      html?.style.removeProperty('--body-bg-rgb');
      html?.style.removeProperty('--body-bg-rgb2');
      html?.style.removeProperty('--light-rgb');
      html?.style.removeProperty('--form-control-bg');
      html?.style.removeProperty('--input-border');

    }
    if (theme == 'dark') {
      this.appStateService.updateState({ theme, themeBackground: '', headerColor: 'dark', menuColor: 'dark' });
      let html = document.querySelector('html');
      html?.style.removeProperty('--body-bg-rgb');
      html?.style.removeProperty('--body-bg-rgb2');
      html?.style.removeProperty('--light-rgb');
      html?.style.removeProperty('--form-control-bg');
      html?.style.removeProperty('--input-border');


    }
  }
  updatemenuType(navigationStyles: string) {
    this.appStateService.updateState({ navigationStyles });
    const currentMenuStyles = this.appStateService.getState('menuStyles') || '';

    if (navigationStyles == 'horizontal') {
      // Set default 'menu-click' if nothing else is set
      // const defaultMenuStyle = currentMenuStyles || '';
      this.appStateService.updateState({ navigationStyles,menuStyles:'menu-click', layoutStyles: '' });
      this.checkMenuElement(currentMenuStyles);  // Use the default style
      const navStyle = document.documentElement.getAttribute('data-nav-style');
  
      if(navStyle === 'menu-click'){
      const Sidebar: any = document.querySelector(".main-menu");
      if (Sidebar) {
          Sidebar.style.marginInline = "0px";
      }
    }
      setTimeout(() => {
        const mainContentElement = document.querySelector(".main-content") as HTMLElement | null;
        if (mainContentElement) {
            mainContentElement.click();
        }
      }, 100);
    } else if(navigationStyles == 'vertical'){
      this.appStateService.updateState({ navigationStyles, menuStyles: '', layoutStyles: 'default' });
    }
}

private checkMenuElement(menuStyles: string) {
  // Define element IDs based on menuStyles
  const elementIds: { [key: string]: string } = {
    'menu-click': 'switcher-menu-click',
    'menu-hover': 'switcher-menu-hover',
    'icon-hover': 'switcher-icon-hover',
    'icon-click': 'switcher-icon-click',

  };

  // Get the corresponding element ID
  const elementId = elementIds[menuStyles];

  if (elementId) {
    const menuElement = document.getElementById(elementId) as HTMLInputElement;
    if (menuElement) {
      menuElement.checked = true;
    }
    else{
          const menuclickclosed = document.getElementById(
        'switcher-menu-click'
      ) as HTMLInputElement;
      menuclickclosed.checked = true;
    }
  }
}

  updatemenuStyle(menuStyles: string) {
    this.appStateService.updateState({ menuStyles, layoutStyles: '' });


    const navStyle = document.documentElement.getAttribute('data-nav-style');
  
    if(navStyle === 'icon-hover'){
      document.querySelector('.double-menu-active')?.setAttribute('style', 'display: none;');
      const Sidebar: any = document.querySelector(".main-menu");
      if (Sidebar) {
          Sidebar.style.marginInline = "0px";
      }
    }
  
    if(navStyle === 'icon-click'){
      const Sidebar: any = document.querySelector(".main-menu");
      if (Sidebar) {
          Sidebar.style.marginInline = "0px";
      }
    }
  }
  updatelayoutStyles(layoutStyles: string) {
    this.appStateService.updateState({ layoutStyles, menuStyles: '' });


  }
  setAttr(key: string, value: string): void {
    const htmlElement = this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(htmlElement, key, value);
    return;
  }
  removeAttr(key: string): void {
    const htmlElement = this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.removeAttribute(htmlElement, key);
    return;
  }
  updatepageStyles(pageStyles: string) {
    this.appStateService.updateState({ pageStyles });
  }
  updatewidthStyles(widthStyles: string) {
    this.appStateService.updateState({ widthStyles });
  }
  updatemenuPosition(menuPosition: string) {
    this.appStateService.updateState({ menuPosition });
  }
  updateheaderPosition(headerPosition: string) {
    this.appStateService.updateState({ headerPosition });
  }
  updatemenuColor(menuColor: string) {
    this.appStateService.updateState({ menuColor });
  }
  updateheaderColor(headerColor: string) {
    this.appStateService.updateState({ headerColor: headerColor });
  }
  updateprimary(themePrimary: string) {
    this.appStateService.updateState({ themePrimary });
  }
  updateBackground(themeBackground: any) {
    // console.log('Updating themeBackground to:', themeBackground);
    // this.localdata['themeBackground'] = themeBackground;
    this.appStateService.updateState({ themeBackground, headerColor: 'dark', menuColor: 'dark',theme:'dark' });
 
  }
  updateBgImage(backgroundImage: string) {
    this.appStateService.updateState({ backgroundImage, });
  }


  //primary theme change

  defaultPrimary = '#6c5ffc';
  public dynamicLightPrimary(data: any): void {
    this.defaultPrimary = data.color;
    let primaryColor = this.convertRgbToIndividual1(this.defaultPrimary)

    this.updateprimary(primaryColor);

  }
  convertRgbToIndividual1(value: string): string {
    // Use a regular expression to extract the numeric values
    const numericValues = value.match(/\d+/g) || [];
    // Join the numeric values with spaces to get the desired format
    return numericValues.join(' , ');
  }
  //background theme change
  convertRgbToIndividual(value: string): string {
    // Use a regular expression to extract the numeric values
    const numericValues = value.match(/\d+/g) || [];
    // Join the numeric values with spaces to get the desired format
    return numericValues.join(' ');
  }
  public defaultBg = '#6c5ffc';
  public dynamicTranparentBgPrimary(data: any): void {
    this.defaultBg = data.color;


    this.defaultBg = data.color;
    let bgRgb = this.convertRgbToIndividual(this.defaultBg);
    let bgRgb2 = this.convertRgbToIndividual(this.defaultBg);
    let bg1Update = bgRgb.split(' ').join(', ');
    let bg2Update: any = bgRgb2.split(' ');
    bg2Update[0] = Number(bg2Update[0]) + 14;
    bg2Update[1] = Number(bg2Update[1]) + 14;
    bg2Update[2] = Number(bg2Update[2]) + 14;
    let bgColor = {
      main: bg1Update, secondary: bg2Update.join(', '),
      accent: bg2Update.join(', '), overlay: 'rgba(255,255,255,0.1)',
      theme: 'dark',
    }
    this.updateBackground(bgColor);


  }



  reset() {
    this.appStateService.applyReset();
  }
}
