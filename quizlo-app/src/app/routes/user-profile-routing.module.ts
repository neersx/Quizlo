

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {path:'user-profile',children:[
    {
      path: '',
      loadComponent: () =>
        import('../pages/profile/user-profile/user-profile').then((m) => m.UserProfile),
    },

  ]}
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class userProfileRoutingModule {
  static routes = admin;
}