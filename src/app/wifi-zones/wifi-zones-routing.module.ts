import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListZoneWifiComponent } from './components/list-zone-wifi/list-zone-wifi.component';

const routes: Routes = [
  {path:'',component:ListZoneWifiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WifiZonesRoutingModule { }
