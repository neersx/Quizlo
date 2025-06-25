import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const content: Routes = [
  {
    path: '',
    children: [
      {path:'', loadChildren : () => import('../../../app/components/dashboards/dashboards.routes').then(r => r.dashboardRoutingModule)},
    ],
  },
  {
    path: '',
    children: [
      {path:'catalogue', loadChildren : () => import('../../../app/components/catalogue/catalogue.routes').then(r => r.CatalougeRoutingModule)},
    ],
  },
];
@NgModule({
  // imports: [RouterModule.forRoot(admin)],
  exports: [RouterModule],
})
export class SaredRoutingModule {}
