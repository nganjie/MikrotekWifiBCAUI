import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { ErrorServer } from '../../../models/error-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { PakageWifiService } from '../../services/pakage-wifi.service';
import { WifiZoneDetail } from '../../../wifi-zones/models/wifi-zone-detail.model';
import { WifiZoneService } from '../../../wifi-zones/services/wifi-zone.service';

@Component({
  selector: 'app-create-pakage-wifi',
  templateUrl: './create-pakage-wifi.component.html',
  styleUrl: './create-pakage-wifi.component.css'
})
export class CreatePakageWifiComponent implements OnInit {
   @Output() realod= new EventEmitter<boolean>()
    @Input()typeOperation='create'
    @Input()pakage_wifi_id?:string
    pakageWifiForm!:FormGroup
    wifiZones$!:Observable<WifiZoneDetail[]>;
    btnSubmit=false
    error$!:Observable<ErrorServer>;
    confirmSubmit$!:Observable<boolean>;
    action=RoutesEnum;
    constructor(private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private pakageWifiServices: PakageWifiService,private wifiZoneService:WifiZoneService){}
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
      this.error$=this.pakageWifiServices.error$;
      this.confirmSubmit$=this.pakageWifiServices.confirmSubmit$
      this.wifiZones$=this.wifiZoneService.wifiZones$;
      this.wifiZoneService.getWifiZonesFormServer({current_page:1,per_page:70});
      this.confirmSubmit$.subscribe(
        bo=>{
          if(this.btnSubmit&&bo)
          {
            this.realod.emit(true)
            this.dismiss()
          }
        }
      )
      this.pakageWifiForm=this.formBuilder.group({
        designation:['',Validators.required],
        description:['',Validators.required],
        wifi_zone_id:['',Validators.required],
        price:['',Validators.required],
      })
      if(this.typeOperation=="update"){
        console.log('ok ici bas')
        const detail =this.pakageWifiServices.getPakageWifiDetail(this.pakage_wifi_id??'')
        detail.subscribe(
          data=>{
            console.log(data);
            console.log('une branche percher');
            this.pakageWifiForm.patchValue({
              designation:data.designation,
              description:data.description,
              wifi_zone_id:data.zone_wifi_id,
              price:data.price
              //captive_gate:data.captive_gate,
              //city:data.city,
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
          this.pakageWifiForm.patchValue({
            image:file
          })
        }
      }else{
        console.log("empty file")
      }
      
    }
    submitForm(){
      if(this.pakageWifiForm.valid)
      {
        this.btnSubmit=true
        console.log(this.pakageWifiForm.value)
        let id=this.pakageWifiForm.get('wifi_zone_id')?.value
        this.pakageWifiForm.removeControl('wifi_zone_id')
        //this.pakageWifiForm.
        console.log(this.pakageWifiForm.value)
        console.log('id : ',id )
        if(this.typeOperation=="create"){
          this.pakageWifiServices.createPakageWifi(this.pakageWifiForm,id);
        }else{
          this.pakageWifiServices.updatePakageWifi(this.pakageWifiForm,this.pakage_wifi_id??'');
        }
        
      }else{
        console.log(this.pakageWifiForm.value)
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
