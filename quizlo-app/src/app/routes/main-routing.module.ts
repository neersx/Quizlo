

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
        path: 'prepare',
        loadComponent: () =>
          import('../pages/ai-tests/prepare-test/prepare-test').then((m) => m.PrepareTest),
      },
      {
        path: 'result',
        loadComponent: () =>
          import('../pages/ai-tests/prepare-test/prepare-test').then((m) => m.PrepareTest),
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