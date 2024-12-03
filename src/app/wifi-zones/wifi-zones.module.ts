import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WifiZonesRoutingModule } from './wifi-zones-routing.module';
import { ListZoneWifiComponent } from './components/list-zone-wifi/list-zone-wifi.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListZoneWifiComponent
  ],
  imports: [
    CommonModule,
    WifiZonesRoutingModule,
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
export class WifiZonesModule { }