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
     {path:'ticket-wifis',loadChildren:()=>import('./ticket-wifi/ticket-wifi.module').then(m=>m.TicketWifiModule)},
     {path:'transactions',loadChildren:()=>import('./transaction/transaction.module').then(m=>m.TransactionModule)},
     {path:'subscriptions',loadChildren:()=>import('./subscription-user/subscription-user.module').then(m=>m.SubscriptionUserModule)},
     {path:'payement-gateways',loadChildren:()=>import('./payement-gateway/payement-gateway.module').then(m=>m.PayementGatewayModule)},
     {path:'withdrawals',loadChildren:()=>import('./withdrawal/withdrawal.module').then(m=>m.WithdrawalModule)},
     {path:'users',loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)},
     {path:'dashboards',loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
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
