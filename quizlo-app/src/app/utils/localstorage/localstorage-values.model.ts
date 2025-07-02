// src/app/core/models/local-storage-values.model.ts

import { LocalStorageKeys } from "./localstorage-keys";

export interface LocalStorageValues {
  [LocalStorageKeys.UserPreferences]: {
    theme?: 'light' | 'dark';
    language?: string;
    defaultExam?: {value: string, code: string, label: string, name: string};
    examLanguage?: string;
  };
  [LocalStorageKeys.AppSettings]: {
    notificationsEnabled: boolean;
    timezone: string;
  };
  [LocalStorageKeys.AuthToken]: string;
}
