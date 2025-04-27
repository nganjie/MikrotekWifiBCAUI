import { Component, OnInit } from '@angular/core';
import { WifiZoneService } from '../../services/wifi-zone.service';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { Currency } from '../../../models/currency.model';
import { LanguageService } from '../../../services/language/language.service';
import { WifiZoneDetail } from '../../models/wifi-zone-detail.model';

@Component({
  selector: 'app-detail-wifi-zones',
  templateUrl: './detail-wifi-zones.component.html',
  styleUrl: './detail-wifi-zones.component.css'
})
export class DetailWifiZonesComponent implements OnInit{
  loading$!:Observable<boolean>;
  wifiZone$!:Observable<WifiZoneDetail>;
  currenies$!:Observable<Currency[]>;
  Id='';
  btnSubmit=false;
  action=RoutesEnum;
  confirmSubmit$!:Observable<boolean>;
  tabs='details';
  //users$!:Observable<User[]>;
  constructor(private languageService:LanguageService,private formBuilder:FormBuilder,private wifiZonesServices:WifiZoneService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.loading$=this.wifiZonesServices.loading$
    this.route.params.pipe(
      map(params=>{
        this.Id=params['id']
      })
    )
    this.confirmSubmit$=this.wifiZonesServices.confirmSubmit$
    this.confirmSubmit$.subscribe(
      b=>{
        if(b){
          this.wifiZone$=this.wifiZonesServices.getWifiZoneDetail(this.Id);
        this.wifiZone$.subscribe(
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
  ido(org:WifiZoneDetail):string{
    console.log('test 12 :',org.id)
    return org.id;
  }
  initObservableOrganisation(){
    this.loading$=this.wifiZonesServices.loading$;
    
    this.route.params.pipe(
      map(params=>{
        this.Id=params['id'];
        this.wifiZone$=this.wifiZonesServices.getWifiZoneDetail(params['id']);
        this.wifiZone$.subscribe(
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
