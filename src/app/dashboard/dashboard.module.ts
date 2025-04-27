import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageService } from '../services/language/language.service';
import { DashboardService } from './services/dashboard.service';
import { BaseChartDirective } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
    DashboardService
  ]
})
export class DashboardModule { }
