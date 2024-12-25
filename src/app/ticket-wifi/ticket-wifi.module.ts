import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketWifiRoutingModule } from './ticket-wifi-routing.module';
import { ListTicketWifiComponent } from './components/list-ticket-wifi/list-ticket-wifi.component';
import { ImportTicketWifiComponent } from './components/import-ticket-wifi/import-ticket-wifi.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageService } from '../services/language/language.service';
import { TicketWifiService } from './service/ticket-wifi.service';


@NgModule({
  declarations: [
    ListTicketWifiComponent,
    ImportTicketWifiComponent
  ],
  imports: [
    CommonModule,
    TicketWifiRoutingModule,
    MatIconModule,
        TranslateModule.forRoot({
          loader:{
            provide:TranslateLoader,
            useFactory:(createTranslateLoader),
            deps:[HttpClient]
          }
        }
        ),
        SharedModule
  ],
  providers:[
      LanguageService,
      TicketWifiService
    ]
})
export class TicketWifiModule { }
