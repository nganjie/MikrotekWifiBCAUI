import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, tap } from 'rxjs';
import { RoutesEnum } from '../../../emuns/routes.enum';
import { ErrorServer } from '../../../models/error-server.model';
import { PakageWifiDetail } from '../../../pakage-wifi/models/pakage-wifi-detail.model';
import { PakageWifiService } from '../../../pakage-wifi/services/pakage-wifi.service';
import { LanguageService } from '../../../services/language/language.service';
import { TicketWifiService } from '../../service/ticket-wifi.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../models/data-server.model';
import { TicketWifiDetail } from '../../models/ticket-wifi-detail.model';

@Component({
  selector: 'app-import-ticket-wifi',
  templateUrl: './import-ticket-wifi.component.html',
  styleUrl: './import-ticket-wifi.component.css'
})
export class ImportTicketWifiComponent implements OnInit{
  @Output() realod= new EventEmitter<boolean>()
      @Input()typeOperation='create'
      @Input()pakage_wifi_id?:string
      loading$!:Observable<boolean>;
      fileData:any;
      ticketWifiForm!:FormGroup
      pakageWifis$!:Observable<PakageWifiDetail[]>;
      btnSubmit=false
      error$!:Observable<ErrorServer>;
      confirmSubmit$!:Observable<boolean>;
      action=RoutesEnum;
      constructor(private http: HttpClient,private languageSservice:LanguageService,@Optional() private readonly activeModal:NgbActiveModal,private formBuilder:FormBuilder,private ticketWifiServices: TicketWifiService,private pakageWifiService:PakageWifiService){}
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
        this.loading$=this.ticketWifiServices.loading$;
        this.pakageWifis$=this.pakageWifiService.pakageWifis$;
        this.pakageWifiService.getPakageWifisFormServer({current_page:1,per_page:70},undefined);
        this.confirmSubmit$.subscribe(
          bo=>{
            console.log('submit ',bo)
            if(this.btnSubmit&&bo)
            {
              this.realod.emit(true)
              this.dismiss()
            }
          }
        )
        this.ticketWifiForm=this.formBuilder.group({
          tickets:['',Validators.required],
          pakage_wifi_id:[this.pakage_wifi_id,Validators.required],
        })
        
      }
      uploadFile(event:any){
        console.log('file');
        if(event.target.files.length>0){
          const file:File=event.target.files[0];
          if(file){
            console.log(file);
            //let formData:FormData= new FormData();
            //formData.append('tickets',file,file.name)
           // this.fileData=formData;
            //let id=this.ticketWifiForm.get('pakage_wifi_id')?.value
            //this.ticketWifiServices.importTicketWifi(formData,id);
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
          //const formData:any=new FormData();
          //formData.append('tickets',this.ticketWifiForm.controls['tickets'].value);
          if(this.typeOperation=="create"){
            //console.log(formData)
           // this.ticketWifiServices.importTicketWifi(this.ticketWifiForm.value,id);
          }
          const formData = new FormData();
  
    const fileSourceValue = this.ticketWifiForm.get('tickets')?.value;
  
    if (fileSourceValue !== null && fileSourceValue !== undefined) {
        formData.append('tickets', fileSourceValue);
    }
    //this.ticketWifiServices.importTicketWifi(formData,id);
       this.ticketWifiServices.setLoadStatus(true)
    this.http.post<ApiResponse<TicketWifiDetail>>(`http://localhost:8002/api/admin/ticket-wifi/${id}/import`, formData,this.ticketWifiServices.headers).pipe(
      tap(data=>{
        console.log(data);
        this.ticketWifiServices.setLoadStatus(false)
        this.ticketWifiServices.setConfirmSubmit(true)
        this.ticketWifiServices.setSnackMesage('Tickets WI-FI Imported successfully')
        //this.confirmSubmit$=of(true)
      })
    )
      .subscribe()
          
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
