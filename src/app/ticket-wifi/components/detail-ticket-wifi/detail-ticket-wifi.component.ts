import { Component, OnInit } from '@angular/core';
import { TicketWifiDetail } from '../../models/ticket-wifi-detail.model';
import { TicketWifiService } from '../../service/ticket-wifi.service';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { PakageWifiDetail } from '../../../pakage-wifi/models/pakage-wifi-detail.model';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-detail-ticket-wifi',
  templateUrl: './detail-ticket-wifi.component.html',
  styleUrl: './detail-ticket-wifi.component.css'
})
export class DetailTicketWifiComponent implements OnInit{
  loading$!:Observable<boolean>;
  ticketWifi$!:Observable<TicketWifiDetail>;
  Id='';
  btnSubmit=false;
  action=RoutesEnum;
  confirmSubmit$!:Observable<boolean>;
  tabs='details';
  //users$!:Observable<User[]>;
  constructor(private languageService:LanguageService,private formBuilder:FormBuilder,private ticketWifiService:TicketWifiService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.loading$=this.ticketWifiService.loading$
    console.log('un monde de merde')
    console.log(this.Id)
    /*this.route.params.pipe(
      map(params=>{
        this.Id=params['id']
        console.log('id ticket : ',params['id'])
      })
    ).subscribe();*/
    this.confirmSubmit$=this.ticketWifiService.confirmSubmit$
    this.confirmSubmit$.subscribe(
      b=>{
        if(b){
          this.ticketWifi$=this.ticketWifiService.getTicketWifiDetail(this.Id);
        this.ticketWifi$.subscribe(
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
    this.loading$=this.ticketWifiService.loading$;
    
    this.route.params.pipe(
      map(params=>{
        this.Id=params['id'];
        console.log('ticket wifi : ',params['id'])
        this.ticketWifi$=this.ticketWifiService.getTicketWifiDetail(params['id']);
        this.ticketWifi$.subscribe(
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
