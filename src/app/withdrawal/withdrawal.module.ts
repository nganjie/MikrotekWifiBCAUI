import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawalRoutingModule } from './withdrawal-routing.module';
import { ListWithdrawalComponent } from './components/list-withdrawal/list-withdrawal.component';
import { CreateWithdrawalComponent } from './components/create-withdrawal/create-withdrawal.component';
import { DetailWithdrawalComponent } from './components/detail-withdrawal/detail-withdrawal.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageService } from '../services/language/language.service';
import { RejectWithdrawalComponent } from './components/reject-withdrawal/reject-withdrawal.component';


@NgModule({
  declarations: [
    ListWithdrawalComponent,
    CreateWithdrawalComponent,
    DetailWithdrawalComponent,
    RejectWithdrawalComponent
  ],
  imports: [
    CommonModule,
    WithdrawalRoutingModule,
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
    LanguageService
  ]
})
export class WithdrawalModule { }
