import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayementGatewayComponent } from './components/list-payement-gateway/list-payement-gateway.component';

const routes: Routes = [
  {path:'',component:ListPayementGatewayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayementGatewayRoutingModule { }
