import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMenuComponent } from './core/components/dashboard-menu/dashboard-menu.component';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  {
    path:'admin',
    component:DashboardMenuComponent,
    children:[
      {path:'',component:DashboardMenuComponent},
     {path:'wifi-zones',loadChildren:()=>import('./wifi-zones/wifi-zones.module').then(m=>m.WifiZonesModule)},
     {path:'pakage-wifis',loadChildren:()=>import('./pakage-wifi/pakage-wifi.module').then(m=>m.PakageWifiModule)},
     { path: '', redirectTo: '', pathMatch: 'full' },
    ]
  },
  
  {path:'login',component:LoginComponent},
  {path:'',pathMatch:'full',redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
