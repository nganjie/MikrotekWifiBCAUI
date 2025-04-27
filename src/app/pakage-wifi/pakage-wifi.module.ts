import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PakageWifiRoutingModule } from './pakage-wifi-routing.module';
import { ListPakageWifiComponent } from './components/list-pakage-wifi/list-pakage-wifi.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageService } from '../services/language/language.service';
import { CreatePakageWifiComponent } from './components/create-pakage-wifi/create-pakage-wifi.component';
import { PakageWifiService } from './services/pakage-wifi.service';
import { DetailPakageWifiComponent } from './components/detail-pakage-wifi/detail-pakage-wifi.component';
import { TicketWifiModule } from '../ticket-wifi/ticket-wifi.module';
import { TransactionModule } from "../transaction/transaction.module";


@NgModule({
  declarations: [
    ListPakageWifiComponent,
    CreatePakageWifiComponent,
    DetailPakageWifiComponent
  ],
  imports: [
    CommonModule,
    PakageWifiRoutingModule,
    MatIconModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    SharedModule,
    TicketWifiModule,
    TransactionModule
],
  exports:[
    ListPakageWifiComponent
  ],
  providers:[
    LanguageService,
    PakageWifiService
  ]
})
export class PakageWifiModule { }
