// src/app/core/models/local-storage-values.model.ts

import { Dropdown } from "../../models/dropdown.model";
import { UserModel } from "../../models/user.model";
import { LocalStorageKeys } from "./localstorage-keys";

export interface LocalStorageValues {
  [LocalStorageKeys.UserPreferences]: {
    theme?: 'light' | 'dark';
    language?: string;
    defaultExam?: { value: string, code: string, label: string, name: string };
    examSubjects?: Dropdown[];
    examLanguage?: string;
  };
  [LocalStorageKeys.AppSettings]: {
    notificationsEnabled: boolean;
    timezone: string;
  };
  [LocalStorageKeys.AuthToken]: string;

  [LocalStorageKeys.UserTests]: {
    activeTestId: number;
    activeAnswers?: any;
    activeQuestionsSet?: any;
  };

  [LocalStorageKeys.UserSubscription]: {
    subscriptionLevel: string;
  };

  [LocalStorageKeys.CurrentUser]: {
    user: UserModel;
  };
}
