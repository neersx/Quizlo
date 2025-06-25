import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface StateType {
  direction: string;
  theme: string;
  navigationStyles: string,   // vertical, horizontal
  menuStyles: string,                 // menu-click, menu-hover, icon-click, icon-hover
  layoutStyles: string,   // double-menu, detached, icon-overlay, icontext-menu, closed-menu, default-menu
  pageStyles: string,          // regular, classic, modern
  widthStyles: string,       // fullwidth, boxed
  menuPosition: string,          // fixed, scrollable
  headerPosition: string,        // fixed, scrollable
  menuColor: string,                  // light, dark, color, gradient, transparent
  headerColor: string,                // light, dark, color, gradient, transparent
  themePrimary: string,               // '58, 88, 146', '92, 144, 163', '161, 90, 223', '78, 172, 76', '223, 90, 90'
  themeBackground: string,
  backgroundImage: string,
};
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly localStorageKey = 'zeno-ng'; // Customize this key
  private initialState: StateType = {
    theme: 'light',            // light, dark
    direction: 'ltr',               // ltr, rtl
    navigationStyles: 'vertical',   // vertical, horizontal
    menuStyles: '',                 // menu-click, menu-hover, icon-click, icon-hover
    layoutStyles: 'default',   // double-menu, detached, icon-overlay, icontext-menu, closed-menu, default-menu
    pageStyles: 'regular',          // regular, classic, modern
    widthStyles: 'fullwidth',       // fullwidth, boxed
    menuPosition: 'fixed',          // fixed, scrollable
    headerPosition: 'fixed',        // fixed, scrollable
    menuColor: 'light',                  // light, dark, color, gradient, transparent
    headerColor: 'light',                // light, dark, color, gradient, transparent
    themePrimary: '',               // '58, 88, 146', '92, 144, 163', '161, 90, 223', '78, 172, 76', '223, 90, 90'
    themeBackground: '',
    backgroundImage: '',            // bgimg1, bgimg2, bgimg3, bgimg4, bgimg5
  } // Store initial state
  private stateSubject = new BehaviorSubject<StateType>(this.initialState); // Use any for initial null value
  state$ = this.stateSubject.asObservable();

  constructor() {
    const initialState: StateType = this.getInitialStateFromLocalStorage();
    this.initializeState();
    this.stateSubject.next(initialState);
  }


  private getInitialStateFromLocalStorage(): StateType {
    try {
      const storedState = localStorage.getItem(this.localStorageKey);
      if (storedState) {
        return JSON.parse(storedState);
      }
    } catch (error) {
      // console.error('Error retrieving initial state from local storage:', error);
    }

    return this.initialState;
  }

  private initializeState() {
    const state = { ...this.initialState }; // Clone initial state to avoid mutation
    this.applyDirectionSpecificChanges(state.direction); // Apply initial changes
    this.stateSubject.next(state); // Emit initial state after changes
  }

  updateState(newState?: Partial<any>) { // Use any for partial updates
    const currentState = this.stateSubject.getValue(); // Get current state

    if (!currentState) {
      // Handle initial update case (no state emitted yet)
      this.updateStateAndEmit(newState);
      return;
    }
    if (newState) {
      const updatedState = { ...currentState, ...newState }; // Merge updates
      this.updateStateAndEmit(updatedState); // Update and emit combined state
    } else {
      this.updateStateAndEmit(currentState);
      return;
    }
    
  }
  private state: { [key: string]: any } = {};
  getState(menuStyles: string): any {
    return this.state[menuStyles];
  }
  private applyThemeBackgroundSpecificChanges(background: any) {
    if (!background) return;
    let html = document.querySelector('html');      
    html?.style.setProperty( '--body-bg-rgb', background.main);
    html?.style.setProperty( '--body-bg-rgb2', background.secondary);
    html?.style.setProperty( '--light-rgb', background.accent );
    html?.style.setProperty( '--form-control-bg', `rgb(${background.secondary})` );
    html?.style.setProperty( '--input-border', background.overlay );
    html?.style.setProperty( '--gray-3', background.overlay );

    this.applythemeSpecificChanges(background.theme);
    
    
  }
  private applyDirectionSpecificChanges(direction: string) {
    let html = document.querySelector('html');
    html?.setAttribute('dir', direction);
  }
  private applythemeSpecificChanges(theme: string) {
    let html = document.querySelector('html');
    html?.setAttribute('data-theme-mode', theme);  //setting theme style
    html?.setAttribute('data-header-styles', theme); //setting header style
    html?.setAttribute('data-menu-styles', theme); //setting menu style
  }
  private applyNavigationStylesSpecificChanges(navigationStyles: string) {

    let html = document.querySelector('html');
    html?.setAttribute('data-nav-layout', navigationStyles);
    if (navigationStyles == 'horizontal') {
      html?.setAttribute('data-nav-style', 'menu-click');
      html?.removeAttribute('data-vertical-style');
    }
  }
  private applyMenuStylesSpecificChanges(menuStyles: string) {
    let html = document.querySelector('html');
    html?.setAttribute('data-nav-style', menuStyles);
    html?.setAttribute('data-toggled', menuStyles+'-closed');
    html?.removeAttribute('data-vertical-style');
  }
  private applyLayoutStylesSpecificChanges(layoutStyles: string) {
    let html = document.querySelector('html');
    html?.setAttribute('data-vertical-style', layoutStyles);
    html?.removeAttribute('data-nav-style');
    switch (layoutStyles) {
      case 'default':
        html?.setAttribute('data-vertical-style', 'overlay');
        html?.setAttribute('data-toggled', '');
        // html?.setAttribute('data-toggled', window.innerWidth <= 992 ? 'close' : '');

        break;
      case 'closed':
        html?.setAttribute('data-toggled', 'close-menu-close');
        break;
      case 'icontext':
        html?.setAttribute('data-toggled', 'icon-text-close');
        break;
      case 'overlay':
        html?.setAttribute('data-toggled', 'icon-overlay-close');
        break;
      case 'detached':
        html?.setAttribute('data-toggled', 'detached-close');
        break;
      case 'doublemenu':
        html?.setAttribute('data-toggled', 'double-menu-open');

        break;
    }
    if (layoutStyles === 'icon-text') {
      html?.setAttribute('icon-text', 'open');
    } else {
      // If not 'icon-text', remove the icon-text attribute
      html?.removeAttribute('icon-text');
    }
  }
  private applypageStylesSpecificChanges(pageStyles: string) {
    let html = document.querySelector('html');    
    html?.setAttribute('data-page-style', pageStyles);
  }
  private applywidthStylesSpecificChanges(widthStyles: string) {
    let html = document.querySelector('html');    
    html?.setAttribute('data-width', widthStyles);
  }
  private applymenuPositionSpecificChanges(menuPosition: string) {
    let html = document.querySelector('html');    
    html?.setAttribute('data-menu-position', menuPosition);
  }
  private applyheaderPositionSpecificChanges(headerPosition: string) {
    let html = document.querySelector('html');    
    html?.setAttribute('data-header-position', headerPosition);
  }
  private applyheaderColorSpecificChanges(headerColor: string) {
    let html = document.querySelector('html');    
    html?.setAttribute('data-header-styles', headerColor);
  }
  private applymenuColorSpecificChanges(menuColor: string) {
    let html = document.querySelector('html');    
    html?.setAttribute('data-menu-styles', menuColor);
  }
  private applyPrimarySpecificChanges(primary: string) {
    let html = document.querySelector('html');        
    // html?.style.setProperty('--primary', primary);
    html?.style.setProperty('--primary-rgb', primary);


  }
  private applybackgroundImageSpecificChanges(backgroundImage: string) {
    let html = document.querySelector('html');        
    html?.setAttribute('data-bg-img', backgroundImage);
  }
 
  public applyReset() {
    let html = document.querySelector('html');
    if(html){
      html?.style.removeProperty( '--body-bg-rgb');
      html?.style.removeProperty( '--gray-3');
      html?.style.removeProperty( '--body-bg-rgb2');
      html?.style.removeProperty( '--light-rgb');
      html?.style.removeProperty( '--form-control-bg');
      html?.style.removeProperty( '--input-border' );
      // html?.style.removeProperty('--primary');
      html?.style.removeProperty('--primary-rgb');
      
    }
    html?.removeAttribute('data-bg-img');
    html?.setAttribute('data-vertical-style','overlay');
    this.stateSubject.next(this.initialState);
    this.updateStateAndEmit(this.initialState);
    localStorage.clear();
  }

  private updateStateAndEmit(state: any) {   
    
    
    
    // Conditional logic based on direction changes        
    const currentState = this.stateSubject.getValue(); // Get current state    
    // Conditional logic based on theme changes
    if (state['theme']) {
      this.applythemeSpecificChanges(state['theme']);
    }
    if (state['direction']) {
      this.applyDirectionSpecificChanges(state['direction']);
    }
    // Conditional logic based on theme changes
    if (state['navigationStyles']) {
      this.applyNavigationStylesSpecificChanges(state['navigationStyles']);
    
    }
    // Conditional logic based on theme changes
    if (state['menuStyles'] && !state['layoutStyles']) {
      this.applyMenuStylesSpecificChanges(state['menuStyles']);
    }
    if (state['layoutStyles'] && !state['menuStyles']) {
      this.applyLayoutStylesSpecificChanges(state['layoutStyles']);
    }
    if (state['pageStyles']) {
      this.applypageStylesSpecificChanges(state['pageStyles']);
    }
    if (state['widthStyles']) {
      this.applywidthStylesSpecificChanges(state['widthStyles']);
    }
    if (state['menuPosition']) {
      this.applymenuPositionSpecificChanges(state['menuPosition']);
    }
    if (state['headerPosition']) {
      this.applyheaderPositionSpecificChanges(state['headerPosition']);
    }
    if (state['themePrimary']) {
      this.applyPrimarySpecificChanges(state['themePrimary']);
    }
    if (state['themeBackground']) {
        this.applyThemeBackgroundSpecificChanges(state['themeBackground']);
    }
    if (state['headerColor']) {
      this.applyheaderColorSpecificChanges(state['headerColor']);
    }
    if (state['menuColor']) {
      this.applymenuColorSpecificChanges(state['menuColor']);
    }
    if (state['backgroundImage']) {
      this.applybackgroundImageSpecificChanges(state['backgroundImage']);
    }



    this.stateSubject.next(state);
    this.updateLocalStorage(state);
  }

  private updateLocalStorage(state: any) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(state));
    } catch (error) {
      // console.error('Error saving state to local storage:', error);
    }
  }
}
