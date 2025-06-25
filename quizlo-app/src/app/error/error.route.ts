import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {path:'error',children:[
    {
      path: 'error404',
      loadComponent: () =>
        import('./error404/error404.component').then((m) => m.Error404Component),
    },
      ]}
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class errorRoutingModule {
  static routes = admin;
}
