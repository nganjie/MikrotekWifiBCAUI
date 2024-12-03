import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http,'./i18n/','.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    }
    )
  ],
  providers: [
    {
      provide:ErrorHandler,
      useClass:CustomErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
