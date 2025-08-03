// src/app/core/services/local-storage.service.ts

import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageKeys } from './localstorage-keys';
import { LocalStorageValues } from './localstorage-values.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {}



  setItem<K extends LocalStorageKeys>(key: K, value: LocalStorageValues[K], isRaw: boolean = false): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(key, isRaw ? value as any : JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting ${key} in localStorage:`, e);
    }
  }

  getItem<K extends LocalStorageKeys>(key: K): LocalStorageValues[K] | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as LocalStorageValues[K];
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage:`, e);
      return null;
    }
  }

  removeItem(key: LocalStorageKeys): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }
}
