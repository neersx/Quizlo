import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';
import { HeaderComponent } from './common/header/header.component';
import { PageHeaderComponent } from './common/page-header/page-header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { SwitcherComponent } from './common/switcher/switcher.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ColorPickerModule } from 'ngx-color-picker'; 
import { TapToTopComponent } from "./common/tap-to-top/tap-to-top.component";
import { FooterComponent } from './common/footer/footer.component';
// import { OverlayscrollbarsModule } from "overlayscrollbars-ngx";
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { FullscreenDirective } from './directives/fullscreen.directive';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { SvgReplaceDirective } from './directives/svgReplace.directive';

@NgModule({
    declarations: [
        PageHeaderComponent,
        SidebarComponent,
        MainLayoutComponent, AuthenticationLayoutComponent, SwitcherComponent, HeaderComponent , TapToTopComponent,
        FooterComponent
    ],
    exports: [
        PageHeaderComponent,
        SidebarComponent, SwitcherComponent, HeaderComponent, FooterComponent, TapToTopComponent
    ],
    imports: [
        CommonModule,
        RouterModule,   
        NgbModule,
        // OverlayscrollbarsModule,
        // ColorPickerModule,
        FormsModule, ReactiveFormsModule,
        RouterModule, FullscreenDirective,
        HoverEffectSidebarDirective,SvgReplaceDirective
    ]
})
export class SharedModule {}
