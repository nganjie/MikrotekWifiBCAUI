import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { LanguageService } from '../services/language/language.service';
import { TransactionService } from './services/transaction.service';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';


@NgModule({
  declarations: [
    ListTransactionComponent,
    TransactionDetailComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
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
  exports:[
    ListTransactionComponent
  ],
  providers:[
        LanguageService,
        TransactionService
      ]
})
export class TransactionModule { }
