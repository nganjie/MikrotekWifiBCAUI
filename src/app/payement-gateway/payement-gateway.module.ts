import { NgModule } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';

import { PayementGatewayRoutingModule } from './payement-gateway-routing.module';
import { ListPayementGatewayComponent } from './components/list-payement-gateway/list-payement-gateway.component';
import { CreatePayementGatewayComponent } from './components/create-payement-gateway/create-payement-gateway.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListPayementGatewayComponent,
    CreatePayementGatewayComponent
  ],
  imports: [
    CommonModule,
    PayementGatewayRoutingModule,
    MatIconModule,
    SlicePipe,
            TranslateModule.forRoot({
              loader:{
                provide:TranslateLoader,
                useFactory:(createTranslateLoader),
                deps:[HttpClient]
              }
            }
            ),
            SharedModule
  ]
})
export class PayementGatewayModule { }
