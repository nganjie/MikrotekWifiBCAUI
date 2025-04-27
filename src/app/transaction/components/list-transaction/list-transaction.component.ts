import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { LanguageService } from '../../../services/language/language.service';
import { TransactionDetail } from '../../models/transaction-detail.model';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { PeriodData, PeriodEnum } from '../../../emuns/period.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WifiZoneDetail } from '../../../wifi-zones/models/wifi-zone-detail.model';
import { PakageWifiDetail } from '../../../pakage-wifi/models/pakage-wifi-detail.model';
import { WifiZoneService } from '../../../wifi-zones/services/wifi-zone.service';
import { PakageWifiService } from '../../../pakage-wifi/services/pakage-wifi.service';
import { dataStatusEnum } from '../../../models/status.enum';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css'
})
export class ListTransactionComponent implements OnInit{
  @Input()ticketWifiId?:string
  @Input()pakageWifiId?:string
  @Input()zoneWifiId?:string
  url!:string;
  transactions$!:Observable<TransactionDetail[]>;
      loading$!:Observable<boolean>;
      itemsPerPage: number = 2;
      paginateData$!:Observable<PaginateData>;
      paginateData!:PaginateData;
      totaElement=0;
      pageEvent!: PageEvent;
      pageArray:number[]=[]
      dataPeriod=PeriodData;
      isCustomPeriod=false;
      statForm!:FormGroup;
      wifiZones$!:Observable<WifiZoneDetail[]>;
      pakageWifis$!:Observable<PakageWifiDetail[]>
      zoneWifiCtrl!:FormControl;
      pakageWifiCtrl!:FormControl;
      dataStatus=dataStatusEnum
      periodCtrl!:FormControl;
      startCtrl!:FormControl;
      statusCtrl!:FormControl;
      endCtrl!:FormControl;
      itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
      page$ =new BehaviorSubject<number>(1);
      constructor(private languageService:LanguageService,private transactionService:TransactionService,private modalService:NgbModal,private formBuilder:FormBuilder,private wifiZoneService:WifiZoneService,private pakageWifiService:PakageWifiService){}
      ngOnInit(): void {
        this.loading$=this.transactionService.loading$;
        this.paginateData$=this.transactionService.paginateData$
        this.paginateData$.subscribe(
          data=>{
            this.paginateData=data;
            this.totaElement=data.total??0
            this.changeChoiceItemPage()
            //this.itemsPerPage=data.per_page;
    
          }
        );

        console.log('ticket wifi ,')
        this.wifiZones$=this.wifiZoneService.wifiZones$;
        this.pakageWifis$=this.pakageWifiService.pakageWifis$;
        this.wifiZoneService.getWifiZonesFullFormServer()

        this.transactions$=this.transactionService.transactions$;
        
        this.periodCtrl=this.formBuilder.control('');
        this.startCtrl=this.formBuilder.control('');
        this.endCtrl=this.formBuilder.control('');
        this.zoneWifiCtrl=this.formBuilder.control('');
        this.pakageWifiCtrl=this.formBuilder.control('');
        this.statusCtrl=this.formBuilder.control('');
        this.statForm=this.formBuilder.group({
          zone_wifi:[this.zoneWifiId],
          pakage_wifi:[this.pakageWifiId],
          status:[null],
          period:[null],
          start_date:this.startCtrl,
          end_date:this.endCtrl,
        });
        if(this.ticketWifiId){
          this.url =`admin/transactions/${this.ticketWifiId}/tickets`
        }else if(this.pakageWifiId){
          this.url =`admin/transactions/${this.pakageWifiId}/pakage-wifi`
        }else if(this.zoneWifiId){
          this.url =`admin/transactions/${this.zoneWifiId}/zone-wifi`
        }else{
          this.url=`admin/transactions/alls`
        }
        this.transactionService.getTransactionsFormServer({current_page:1,per_page:this.itemsPerPage},this.statForm.value,this.url);
        this.initFilter()
      }
      initFilter(){
        this.periodCtrl.valueChanges.pipe(
          map(value => {
            if (this.periodCtrl.value && value == 'null') {
              console.log('test fermeture')
              this.periodCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.period = value
            if (this.periodCtrl.value && value) {
              if (value == PeriodEnum.CustomPeriod) {
                this.isCustomPeriod = true
              } else {
                this.isCustomPeriod = false;
                console.log(this.statForm.value)
                this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
              }
    
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
            }
          })
        ).subscribe()
        this.zoneWifiCtrl.valueChanges.pipe(
          map(value => {
            if (this.zoneWifiCtrl.value && value == 'null') {
              this.zoneWifiCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.zone_wifi = value
            if (this.zoneWifiCtrl.value && value) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
              this.pakageWifis$=this.wifiZoneService.getPakageWifisFormServer(value);
              this.pakageWifis$.subscribe();
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
    
            }
          })
        ).subscribe()
        this.pakageWifiCtrl.valueChanges.pipe(
          map(value => {
            if (this.pakageWifiCtrl.value && value == 'null') {
              this.pakageWifiCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.pakage_wifi = value
            if (this.pakageWifiCtrl.value && value) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
    
            }
          })
        ).subscribe()
        this.statusCtrl.valueChanges.pipe(
          map(value => {
            if (this.statusCtrl.value && value == 'null') {
              this.statusCtrl.setValue(null)
            }
            console.log(value)
            const val = this.statForm.value
            val.status = value
            if (this.statusCtrl.value && value) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
    
            }
          })
        ).subscribe()
        this.startCtrl.valueChanges.pipe(
          map(value => {
            console.log(value)
    
            if (value && this.endCtrl.value) {
              const val = this.statForm.value
              val.start = value
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
    
            }
          })
        ).subscribe()
    
        this.endCtrl.valueChanges.pipe(
          map(value => {
            console.log(value)
            if (value && this.startCtrl.value) {
              const val = this.statForm.value
              val.end = value
              this.transactionService.getTransactionsFormServer(this.paginateData,val,this.url);
    
            }
          })
        ).subscribe()
      }
      detailTransaction(transaction :TransactionDetail){
              const modalRef =this.modalService.open(TransactionDetailComponent,{
                centered:true,
                backdrop:'static',
                size:'lg'
              });
              var reloadPgae:Observable<boolean>;
              modalRef.componentInstance.transactionId=transaction.id;
              
      }
      pageChange(event:PageEvent):PageEvent {
        //if(event.pageSize!=this.itemsPerPage){}
        //this.itemsPerPage=event.pageSize;
        //this.itemsPerPage$.next(this.itemsPerPage)
        this.paginateData.current_page=event.pageIndex+1
        this.paginateData.per_page=event.pageSize;
        this.transactionService.getTransactionsFormServer(this.paginateData,this.statForm.value,this.url)
        console.log(this.paginateData)
        return event;
      }
      initPaginator(){
        this.page$.subscribe(
          (pages)=>{
            
          }
        )
        this.itemsPerPage$.subscribe(
          (items)=>{
    
          }
        )
      }
      changeChoiceItemPage(){
        let arr:number[]=[];
        console.log(this.pageArray)
        if(this.totaElement<=2)
        {
          console.log('total',this.totaElement)
          arr.push(this.totaElement)
      
        }else{
          for(let i=1;i<this.totaElement/2;i++)
            {
              arr.push(i*2)
            }
            if(this.totaElement%2>0){
              arr.push(this.totaElement)
            }
        }
        console.log(arr);
        this.pageArray=arr;
      }
    
}
