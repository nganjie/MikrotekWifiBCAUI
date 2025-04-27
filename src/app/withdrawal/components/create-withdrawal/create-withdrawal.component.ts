import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { ErrorServer } from '../../../models/error-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { SubscriptionService } from '../../../subscription-user/services/subscription.service';
import { WithdrawalService } from '../../services/withdrawal.service';

@Component({
  selector: 'app-create-withdrawal',
  templateUrl: './create-withdrawal.component.html',
  styleUrl: './create-withdrawal.component.css'
})
export class CreateWithdrawalComponent implements OnInit {
   @Output() realod= new EventEmitter<boolean>()
    @Input()typeOperation='create'
    @Input()withdrawal_wifi_id?:string;
    loading$!:Observable<boolean>;
    withdrawalForm!:FormGroup
    btnSubmit=false
    error$!:Observable<ErrorServer>;
    confirmSubmit$!:Observable<boolean>;
    action=RoutesEnum;
    constructor(private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private withdrawalServices: WithdrawalService){}
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
      this.error$=this.withdrawalServices.error$;
      this.confirmSubmit$=this.withdrawalServices.confirmSubmit$
      this.loading$=this.withdrawalServices.loading$;
      this.confirmSubmit$.subscribe(
        bo=>{
          if(this.btnSubmit&&bo)
          {
            this.realod.emit(true)
            this.dismiss()
          }
        }
      )
      this.withdrawalForm=this.formBuilder.group({
        receiver_number:['',Validators.required],
      })
    }
    uploadFile(event:any){
      console.log('file');
      if(event.target.files.length>0){
        const file:File=event.target.files[0];
        if(file){
          console.log(file);
          const formData= new FormData();
          this.withdrawalForm.patchValue({
            image:file
          })
        }
      }else{
        console.log("empty file")
      }
      
    }
    submitForm(){
      if(this.withdrawalForm.valid)
      {
        this.btnSubmit=true
        console.log(this.withdrawalForm.value)
        if(this.typeOperation=="create"){
          this.withdrawalServices.createwithdrawal(this.withdrawalForm);
        }else{
          this.withdrawalServices.updatewithdrawal(this.withdrawalForm,this.withdrawal_wifi_id??'');
        }
        
      }else{
        console.log(this.withdrawalForm.value)
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
