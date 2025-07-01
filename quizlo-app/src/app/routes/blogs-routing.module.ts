

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const admin: Routes = [
  {path:'blogs',children:[
    {
      path: 'list',
      loadComponent: () =>
        import('../pages/blogs/blogs-list/blogs-list').then((m) => m.BlogsList),
    },
    {
        path: 'blog-details',
        loadComponent: () =>
          import('../pages/blogs/blog-details/blog-details').then((m) => m.BlogDetails),
      },

  ]}
];
@NgModule({
  imports: [RouterModule.forChild(admin)],
  exports: [RouterModule],
})
export class blogsRoutingModule {
  static routes = admin;
}