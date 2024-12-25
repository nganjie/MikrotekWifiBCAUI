import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { ErrorServer } from '../../../models/error-server.model';
import { PakageWifiDetail } from '../../../pakage-wifi/models/pakage-wifi-detail.model';
import { PakageWifiService } from '../../../pakage-wifi/services/pakage-wifi.service';
import { LanguageService } from '../../../services/language/language.service';
import { TicketWifiService } from '../../service/ticket-wifi.service';

@Component({
  selector: 'app-import-ticket-wifi',
  templateUrl: './import-ticket-wifi.component.html',
  styleUrl: './import-ticket-wifi.component.css'
})
export class ImportTicketWifiComponent implements OnInit{
  @Output() realod= new EventEmitter<boolean>()
      @Input()typeOperation='create'
      @Input()pakage_wifi_id?:string
      ticketWifiForm!:FormGroup
      pakageWifis$!:Observable<PakageWifiDetail[]>;
      btnSubmit=false
      error$!:Observable<ErrorServer>;
      confirmSubmit$!:Observable<boolean>;
      action=RoutesEnum;
      constructor(private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private ticketWifiServices: TicketWifiService,private pakageWifiService:PakageWifiService){}
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
        this.error$=this.ticketWifiServices.error$;
        this.confirmSubmit$=this.ticketWifiServices.confirmSubmit$
        this.pakageWifis$=this.pakageWifiService.pakageWifis$;
        this.pakageWifiService.getPakageWifisFormServer({current_page:1,per_page:70});
        this.confirmSubmit$.subscribe(
          bo=>{
            if(this.btnSubmit&&bo)
            {
              this.realod.emit(true)
              this.dismiss()
            }
          }
        )
        this.ticketWifiForm=this.formBuilder.group({
          tickets:['',Validators.required],
          pakage_wifi_id:['',Validators.required],
        })
        
      }
      uploadFile(event:any){
        console.log('file');
        if(event.target.files.length>0){
          const file=event.target.files[0];
          if(file){
            console.log(file);
            const formData= new FormData();
            this.ticketWifiForm.patchValue({
              tickets:file
            })
          }
        }else{
          console.log("empty file")
        }
        
      }
      submitForm(){
        if(this.ticketWifiForm.valid)
        {
          this.btnSubmit=true
          console.log(this.ticketWifiForm.value)
          let id=this.ticketWifiForm.get('pakage_wifi_id')?.value
          //this.ticketWifiForm.removeControl('pakage_wifi_id')
          //this.ticketWifiForm.
          console.log(this.ticketWifiForm.value)
          console.log('id : ',id )
          if(this.typeOperation=="create"){
            this.ticketWifiServices.importTicketWifi(this.ticketWifiForm.get('tickets')?.value,id);
          }
          
        }else{
          console.log(this.ticketWifiForm.value)
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
