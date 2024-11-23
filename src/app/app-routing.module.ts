import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMenuComponent } from './core/components/dashboard-menu/dashboard-menu.component';

const routes: Routes = [
  {
    path:'admin',
    component:DashboardMenuComponent,
    children:[
      {path:'',component:DashboardMenuComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
