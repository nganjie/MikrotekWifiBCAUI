import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WifiZonesRoutingModule } from './wifi-zones-routing.module';
import { ListZoneWifiComponent } from './components/list-zone-wifi/list-zone-wifi.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { CreateWifiZoneComponent } from './components/create-wifi-zone/create-wifi-zone.component';
import { LanguageService } from '../services/language/language.service';
import { WifiZoneService } from './services/wifi-zone.service';
import { DetailWifiZonesComponent } from './components/detail-wifi-zones/detail-wifi-zones.component';
import { PakageWifiModule } from '../pakage-wifi/pakage-wifi.module';
import { TransactionModule } from '../transaction/transaction.module';


@NgModule({
  declarations: [
    ListZoneWifiComponent,
    CreateWifiZoneComponent,
    DetailWifiZonesComponent
  ],
  imports: [
    CommonModule,
    WifiZonesRoutingModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    }
    ),
    SharedModule,
    PakageWifiModule,
    TransactionModule
  ],
  providers:[
    LanguageService,
    WifiZoneService
  ]
})
export class WifiZonesModule { }
