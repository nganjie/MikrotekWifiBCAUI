import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    DashboardMenuComponent,
    SidebarLeftComponent,
    SidebarTopComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterOutlet,
  ],
  exports:[
    DashboardMenuComponent,
    SidebarTopComponent,
    LoginComponent
  ]
})
export class CoreModule { }
