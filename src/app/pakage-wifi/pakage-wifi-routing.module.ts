import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPakageWifiComponent } from './components/list-pakage-wifi/list-pakage-wifi.component';
import { DetailPakageWifiComponent } from './components/detail-pakage-wifi/detail-pakage-wifi.component';

const routes: Routes = [
  {path:'',component:ListPakageWifiComponent},
  {path:':id',component:DetailPakageWifiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PakageWifiRoutingModule { }
