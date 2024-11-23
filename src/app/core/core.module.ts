import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component';


@NgModule({
  declarations: [
    DashboardMenuComponent,
    SidebarLeftComponent,
    SidebarTopComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports:[
    DashboardMenuComponent,
    SidebarTopComponent
  ]
})
export class CoreModule { }
