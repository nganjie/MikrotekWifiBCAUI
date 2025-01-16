import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubscriptionComponent } from './components/list-subscription/list-subscription.component';
import { ListPakageComponent } from './components/list-pakage/list-pakage.component';

const routes: Routes = [
  {path:'',component:ListSubscriptionComponent},
  {path:'pakage-user',component:ListPakageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionUserRoutingModule { }
