import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListZoneWifiComponent } from './components/list-zone-wifi/list-zone-wifi.component';
import { DetailWifiZonesComponent } from './components/detail-wifi-zones/detail-wifi-zones.component';

const routes: Routes = [
  {path:'',component:ListZoneWifiComponent},
  {path:':id',component:DetailWifiZonesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WifiZonesRoutingModule { }
