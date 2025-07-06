

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {path:'test',children:[
    {
      path: '',
      loadComponent: () =>
        import('../pages/ai-tests/prepare-test/prepare-test').then((m) => m.PrepareTest),
    },
    {
        path: 'live-test',
        loadComponent: () =>
          import('../pages/ai-tests/live-test/live-test').then((m) => m.LiveTest),
      },
      {
        path: 'test-window/:id',
        loadComponent: () =>
          import('../pages/ai-tests/test-window/test-window').then((m) => m.TestWindow),
      },
      {
        path: 'test-result/:id',
        loadComponent: () =>
          import('../pages/ai-tests/test-result/test-result').then((m) => m.TestResult),
      },
      {
        path: 'select-exam',
        loadComponent: () =>
          import('../pages/ai-tests/exams-home/exams-home').then((m) => m.ExamsHome),
      },

  ]}
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class pagesRoutingModule {
  static routes = admin;
}