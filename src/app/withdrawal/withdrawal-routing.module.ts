import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWithdrawalComponent } from './components/list-withdrawal/list-withdrawal.component';

const routes: Routes = [
  {path:'',component:ListWithdrawalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalRoutingModule { }
