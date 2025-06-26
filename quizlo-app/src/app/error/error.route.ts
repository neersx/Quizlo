import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
   // default redirect so /error → /error/error404
   { path: '', redirectTo: 'error404', pathMatch: 'full' },

   // /error/error404 → Error404Component
   { 
     path: 'error404',
     loadComponent: () => import('./error404/error404.component').then(m => m.Error404Component),
   },
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class errorRoutingModule {
  static routes = admin;
}
