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


@NgModule({
  declarations: [
    ListZoneWifiComponent,
    CreateWifiZoneComponent
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
    SharedModule
  ],
  providers:[
    LanguageService,
    WifiZoneService
  ]
})
export class WifiZonesModule { }
