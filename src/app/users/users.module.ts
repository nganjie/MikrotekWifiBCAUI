import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { LanguageService } from '../services/language/language.service';


@NgModule({
  declarations: [
    ListUserComponent,
    DetailUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
      UserService
    ]
})
export class UsersModule { }
