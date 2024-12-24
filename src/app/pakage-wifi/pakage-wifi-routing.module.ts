import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPakageWifiComponent } from './components/list-pakage-wifi/list-pakage-wifi.component';

const routes: Routes = [
  {path:'',component:ListPakageWifiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PakageWifiRoutingModule { }
