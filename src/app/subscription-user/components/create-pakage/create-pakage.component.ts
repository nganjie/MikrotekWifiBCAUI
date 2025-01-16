import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { ErrorServer } from '../../../models/error-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { WifiZoneDetail } from '../../../wifi-zones/models/wifi-zone-detail.model';

@Component({
  selector: 'app-create-pakage',
  templateUrl: './create-pakage.component.html',
  styleUrl: './create-pakage.component.css'
})
export class CreatePakageComponent implements OnInit {
   @Output() realod= new EventEmitter<boolean>()
    @Input()typeOperation='create'
    @Input()pakage_wifi_id?:string
    pakageForm!:FormGroup
    wifiZones$!:Observable<WifiZoneDetail[]>;
    btnSubmit=false
    error$!:Observable<ErrorServer>;
    confirmSubmit$!:Observable<boolean>;
    action=RoutesEnum;
    constructor(private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private pakageServices: SubscriptionService){}
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
      this.error$=this.pakageServices.error$;
      this.confirmSubmit$=this.pakageServices.confirmSubmit$
      this.confirmSubmit$.subscribe(
        bo=>{
          if(this.btnSubmit&&bo)
          {
            this.realod.emit(true)
            this.dismiss()
          }
        }
      )
      this.pakageForm=this.formBuilder.group({
        name:['',Validators.required],
        type:['',Validators.required],
        fixed_charge:['',Validators.required],
        percent_charge:['',Validators.required],
        min_limit:['',Validators.required],
      })
      if(this.typeOperation=="update"){
        console.log('ok ici bas')
        const detail =this.pakageServices.getPakageDetail(this.pakage_wifi_id??'')
        detail.subscribe(
          data=>{
            console.log(data);
            console.log('une branche percher');
            this.pakageForm.patchValue({
              name:data.name,
              type:data.type,
              fixed_charge:data.fixed_charge,
              percent_charge:data.percent_charge,
              min_limit:data.min_limit,
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
          this.pakageForm.patchValue({
            image:file
          })
        }
      }else{
        console.log("empty file")
      }
      
    }
    submitForm(){
      if(this.pakageForm.valid)
      {
        this.btnSubmit=true
        console.log(this.pakageForm.value)
        if(this.typeOperation=="create"){
          this.pakageServices.createpakage(this.pakageForm);
        }else{
          this.pakageServices.updatepakage(this.pakageForm,this.pakage_wifi_id??'');
        }
        
      }else{
        console.log(this.pakageForm.value)
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

