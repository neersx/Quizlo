import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
export const landing: Routes = [
    {path:'pages',children:[
        {
            path: '',
            loadComponent: () =>
              import('../layouts/landing-page-layout/landing-page-layout').then((m) => m.LandingPageLayout),
          },
    ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(landing)],
    exports: [RouterModule],
  })
  export class landingRoutingModule {
    static routes = landing;
  }