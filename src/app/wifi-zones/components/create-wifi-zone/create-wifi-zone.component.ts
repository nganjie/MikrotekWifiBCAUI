import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { Contry } from '../../../models/contry-server.model';
import { Currency } from '../../../models/currency.model';
import { ErrorServer } from '../../../models/error-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { WifiZoneService } from '../../services/wifi-zone.service';

@Component({
  selector: 'app-create-wifi-zone',
  templateUrl: './create-wifi-zone.component.html',
  styleUrl: './create-wifi-zone.component.css'
})
export class CreateWifiZoneComponent implements OnInit{
  @Output() realod= new EventEmitter<boolean>()
  @Input()typeOperation='create'
  @Input()wifi_zone_id?:string;
  loading$!:Observable<boolean>;
  wifiZoneForm!:FormGroup
  btnSubmit=false
  error$!:Observable<ErrorServer>;
  confirmSubmit$!:Observable<boolean>;
  action=RoutesEnum;
  constructor(private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private wifiZoneServices: WifiZoneService){}
  ngOnInit(): void {
    this.initForm()
  }
  confirm():void{
    if(this.activeModal)
      this.activeModal.close()
  }
  dismiss():void{
    if(this.activeModal)
    {
      this.activeModal.dismiss()
    }
      
  }
  initForm(){
    this.error$=this.wifiZoneServices.error$;
    this.confirmSubmit$=this.wifiZoneServices.confirmSubmit$
    this.loading$=this.wifiZoneServices.loading$;
    this.confirmSubmit$.subscribe(
      bo=>{
        if(this.btnSubmit&&bo)
        {
          this.realod.emit(true)
          this.dismiss()
        }
      }
    )
    this.wifiZoneForm=this.formBuilder.group({
      name:['',Validators.required],
      captive_gate:['',Validators.required],
      description:['',Validators.required],
      //image:[''],
      city:['',Validators.required],
    })
    if(this.typeOperation=="update"){
      const detail =this.wifiZoneServices.getWifiZoneDetail(this.wifi_zone_id??'')
      detail.subscribe(
        data=>{
          this.wifiZoneForm.patchValue({
            name:data.name,
            description:data.description,
            captive_gate:data.captive_gate,
            city:data.city,
          })
        }
      )
    }
  }
  uploadFile(event:any){
    console.log('file');
    if(event.target.files.length>0){
      const file:File=event.target.files[0];
      if(file){
        console.log(file);
        const formData= new FormData();
        this.wifiZoneForm.patchValue({
          image:file
        })
      }
    }else{
      console.log("empty file")
    }
    
  }
  submitForm(){
    if(this.wifiZoneForm.valid)
    {
      this.btnSubmit=true
      console.log(this.wifiZoneForm.value)
      if(this.typeOperation=="create"){
        this.wifiZoneServices.createWifiZone(this.wifiZoneForm);
      }else{
        this.wifiZoneServices.updateWifiZone(this.wifiZoneForm,this.wifi_zone_id??'');
      }
      
    }else{
      console.log(this.wifiZoneForm.value)
      console.log("un bon autre")
      this.btnSubmit=true
    }
  }
  getFormControlErrorText(ctrl:AbstractControl|null){
    if(ctrl?.hasError('required')){
      return "ce champ est réquis";
    }else if(ctrl?.hasError('email')){
      return "merci d'entre une adresse mail valide"
    }else if(ctrl?.hasError('minlength')){
      return 'Ce numéro de téléphone ne contient pas assez de chiffre'
    }else if(ctrl?.hasError('maxlength')){
      return 'Ce numéro de téléphone contient trop de chiffre'
    }else{
      return '';
    }
  }
}
