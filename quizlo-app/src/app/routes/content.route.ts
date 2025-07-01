import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const content: Routes = [
  {
    path: '',
    children: [
      {path:'', loadChildren : () => import('../routes/main-routing.module').then(r => r.pagesRoutingModule)},
    ],
  },
  {
    path: '',
    children: [
      {path:'', loadChildren : () => import('../../app/routes/blogs-routing.module').then(r => r.blogsRoutingModule)},
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(content)],
  exports: [RouterModule],
})
export class SaredRoutingModule {}
