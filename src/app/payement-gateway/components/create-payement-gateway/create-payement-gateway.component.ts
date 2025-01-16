import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { ErrorServer } from '../../../models/error-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { PayementGatewayService } from '../../services/payement-gateway.service';

@Component({
  selector: 'app-create-payement-gateway',
  templateUrl: './create-payement-gateway.component.html',
  styleUrl: './create-payement-gateway.component.css'
})
export class CreatePayementGatewayComponent implements OnInit {
   @Output() realod= new EventEmitter<boolean>()
    @Input()typeOperation='create'
    @Input()pakage_wifi_id?:string
    payementGatewayForm!:FormGroup
    btnSubmit=false
    error$!:Observable<ErrorServer>;
    confirmSubmit$!:Observable<boolean>;
    action=RoutesEnum;
    constructor(private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private payementGatewayServices: PayementGatewayService){}
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
      this.error$=this.payementGatewayServices.error$;
      this.confirmSubmit$=this.payementGatewayServices.confirmSubmit$
      this.confirmSubmit$.subscribe(
        bo=>{
          if(this.btnSubmit&&bo)
          {
            this.realod.emit(true)
            this.dismiss()
          }
        }
      )
      this.payementGatewayForm=this.formBuilder.group({
        site_id:['',Validators.required],
        secret_key:['',Validators.required],
        api_key:['',Validators.required],
        url:['',Validators.required],
      })
      if(this.typeOperation=="update"){
        console.log('ok ici bas')
        const detail =this.payementGatewayServices.getPayementGatewayDetail(this.pakage_wifi_id??'')
        detail.subscribe(
          data=>{
            console.log(data);
            console.log('une branche percher');
            this.payementGatewayForm.patchValue({
              site_id:data.site_id,
              secret_key:data.secret_key,
              api_key:data.api_key,
              url:data.url
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
          this.payementGatewayForm.patchValue({
            image:file
          })
        }
      }else{
        console.log("empty file")
      }
      
    }
    submitForm(){
      if(this.payementGatewayForm.valid)
      {
        this.btnSubmit=true
        console.log(this.payementGatewayForm.value)
        let id=this.payementGatewayForm.get('wifi_zone_id')?.value
        this.payementGatewayForm.removeControl('wifi_zone_id')
        //this.payementGatewayForm.
        console.log(this.payementGatewayForm.value)
        console.log('id : ',id )
        if(this.typeOperation=="create"){
          this.payementGatewayServices.createpayementGateway(this.payementGatewayForm,id);
        }else{
          this.payementGatewayServices.updatepayementGateway(this.payementGatewayForm,this.pakage_wifi_id??'');
        }
        
      }else{
        console.log(this.payementGatewayForm.value)
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

