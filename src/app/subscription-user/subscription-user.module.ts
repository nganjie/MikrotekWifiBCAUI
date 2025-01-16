import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionUserRoutingModule } from './subscription-user-routing.module';
import { ListSubscriptionComponent } from './components/list-subscription/list-subscription.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageService } from '../services/language/language.service';
import { SubscriptionService } from './services/subscription.service';
import { ListPakageComponent } from './components/list-pakage/list-pakage.component';
import { CreatePakageComponent } from './components/create-pakage/create-pakage.component';


@NgModule({
  declarations: [
    ListSubscriptionComponent,
    ListPakageComponent,
    CreatePakageComponent
  ],
  imports: [
    CommonModule,
    SubscriptionUserRoutingModule,
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
    SubscriptionService
  ]
})
export class SubscriptionUserModule { }
