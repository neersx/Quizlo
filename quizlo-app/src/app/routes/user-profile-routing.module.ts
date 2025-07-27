

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {path:'user-profile',children:[
    {
      path: '',
      loadComponent: () =>
        import('../pages/profile/user-profile/user-profile').then((m) => m.UserProfile),
    },
      // {
      //   path: 'edit/:id',
      //   loadComponent: () =>
      //     import('../pages/profile/user-tests/user-tests').then((m) => m.UserTests),
      // },

  ]}
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class userProfileRoutingModule {
  static routes = admin;
}