import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private platformId = inject(PLATFORM_ID);

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getDocument(): Document | null {
    return this.isBrowser() ? document : null;
  }

  getWindow(): Window | null {
    return this.isBrowser() ? window : null;
  }
}
