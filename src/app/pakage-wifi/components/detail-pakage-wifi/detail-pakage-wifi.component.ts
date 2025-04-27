import { Component, OnInit } from '@angular/core';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { PakageWifiService } from '../../services/pakage-wifi.service';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LanguageService } from '../../../services/language/language.service';
import { PakageWifiDetail } from '../../models/pakage-wifi-detail.model';

@Component({
  selector: 'app-detail-pakage-wifi',
  templateUrl: './detail-pakage-wifi.component.html',
  styleUrl: './detail-pakage-wifi.component.css'
})
export class DetailPakageWifiComponent implements OnInit{
  loading$!:Observable<boolean>;
  pakageWifi$!:Observable<PakageWifiDetail>;
  Id='';
  btnSubmit=false;
  action=RoutesEnum;
  confirmSubmit$!:Observable<boolean>;
  tabs='details';
  //users$!:Observable<User[]>;
  constructor(private languageService:LanguageService,private formBuilder:FormBuilder,private pakageWifiService:PakageWifiService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.loading$=this.pakageWifiService.loading$
    this.route.params.pipe(
      map(params=>{
        this.Id=params['id']
      })
    )
    this.confirmSubmit$=this.pakageWifiService.confirmSubmit$
    this.confirmSubmit$.subscribe(
      b=>{
        if(b){
          this.pakageWifi$=this.pakageWifiService.getPakageWifiDetail(this.Id);
        this.pakageWifi$.subscribe(
          data=>{
            //this.setSetting(data)
          }
        );
        }
      }
    )
    this.initForm()
    this.initObservableOrganisation()
    this.initObservableUsers();
  }


  addInputDetail(name:string){

    /*if(this.detailArray.valid){
      this.detailArray.push(this.formBuilder.group(this.detailForm.value))
    }*/
    
  }

  initForm(){
  }
  ido(org:PakageWifiDetail):string{
    console.log('test 12 :',org.id)
    return org.id;
  }
  initObservableOrganisation(){
    this.loading$=this.pakageWifiService.loading$;
    
    this.route.params.pipe(
      map(params=>{
        this.Id=params['id'];
        this.pakageWifi$=this.pakageWifiService.getPakageWifiDetail(params['id']);
        this.pakageWifi$.subscribe(
          data=>{
            //this.setSetting(data)
          }
        );
      })
    ).subscribe()
  }
  initObservableUsers(){

    /**/
  }
    changeSection(section:string,event:any){
      event.preventDefault();
      this.tabs=section
    }
    getFormControlErrorText(ctrl:AbstractControl|null|undefined){
        if(ctrl?.hasError('required')){
          return "ce champ est réquis";
        }else if(ctrl?.hasError('email')){
          return "merci d'entre une adresse mail valide"
        }else if(ctrl?.hasError('minlength')){
          return 'Ce numéro de téléphone ne contient pas assez de chiffre'
        }else if(ctrl?.hasError('maxlength')){
          return 'Ce numéro de téléphone contient trop de chiffre'
        }else{
          return 'test ';
        }
      }

}
