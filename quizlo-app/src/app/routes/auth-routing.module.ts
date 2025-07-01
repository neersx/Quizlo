import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const admin: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('../pages/identity/login/login').then(
            (m) => m.Login
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('../pages/identity/register/register').then(
            (m) => m.Register
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../pages/identity/reset-password/reset-password').then(
            (m) => m.ResetPassword
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('../pages/identity/forget-password/forget-password').then(
            (m) => m.ForgetPassword
          ),
      },

      
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class authenticationRoutingModule {
  static routes = admin;
}
