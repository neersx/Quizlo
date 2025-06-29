import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const content: Routes = [
  {
    path: '',
    children: [
      {path:'', loadChildren : () => import('../routes/main-routing.module').then(r => r.pagesRoutingModule)},
    ],
  },
  // {
  //   path: '',
  //   children: [
  //     {path:'catalogue', loadChildren : () => import('../../../app/components/catalogue/catalogue.routes').then(r => r.CatalougeRoutingModule)},
  //   ],
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(content)],
  exports: [RouterModule],
})
export class SaredRoutingModule {}
