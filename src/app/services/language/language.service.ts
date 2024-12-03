import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable()

export class LanguageService{
    private keyLanguage='userLanguage'
    private _userLanguage='';
    constructor(private translate :TranslateService){
        this.initLanguage();
        this.translate.use(this._userLanguage)
    }
    private supportedLanguage=['en','fr']
    initLanguage(){
        const value =localStorage.getItem(this.keyLanguage);
        if(value){
            this._userLanguage=value;
        }else{
            const browserLanguage=navigator.language.split('-')[0];
            this._userLanguage='en';
            if(this.supportedLanguage.includes(browserLanguage)){
                this._userLanguage=browserLanguage;
                localStorage.setItem(this.keyLanguage,browserLanguage);
            }
        }
    }
    setLanguage(language:string){
        this._userLanguage=language;
        localStorage.setItem(this.keyLanguage,this._userLanguage);
        this.translate.use(this._userLanguage)
    }
    getAvailableLanguages(){
        return this.supportedLanguage;
    }
    getCurrentLanguage():string{
        return this._userLanguage;
    }
}