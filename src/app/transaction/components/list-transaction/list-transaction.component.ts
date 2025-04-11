import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.css'
})
export class ListTransactionComponent implements OnInit{
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
      periodCtrl!:FormControl;
      startCtrl!:FormControl;
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
        this.wifiZones$=this.wifiZoneService.wifiZones$;
        this.pakageWifis$=this.pakageWifiService.pakageWifis$;
        this.wifiZoneService.getWifiZonesFullFormServer()

        this.transactions$=this.transactionService.transactions$;
        
        this.periodCtrl=this.formBuilder.control('');
        this.startCtrl=this.formBuilder.control('');
        this.endCtrl=this.formBuilder.control('');
        this.zoneWifiCtrl=this.formBuilder.control('');
        this.pakageWifiCtrl=this.formBuilder.control('');
        this.statForm=this.formBuilder.group({
          zone_wifi:[null],
          pakage_wifi:[null],
          status:[null],
          period:[null],
          start_date:this.startCtrl,
          end_date:this.endCtrl,
        });
        this.transactionService.getTransactionsFormServer({current_page:1,per_page:this.itemsPerPage},this.statForm.value);
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
                this.transactionService.getTransactionsFormServer(this.paginateData,val);
              }
    
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
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
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
              this.pakageWifis$=this.wifiZoneService.getPakageWifisFormServer(value);
              this.pakageWifis$.subscribe();
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
    
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
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
            } else if (value == null) {
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
    
            }
          })
        ).subscribe()
        this.startCtrl.valueChanges.pipe(
          map(value => {
            console.log(value)
    
            if (value && this.endCtrl.value) {
              const val = this.statForm.value
              val.start = value
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
    
            }
          })
        ).subscribe()
    
        this.endCtrl.valueChanges.pipe(
          map(value => {
            console.log(value)
            if (value && this.startCtrl.value) {
              const val = this.statForm.value
              val.end = value
              this.transactionService.getTransactionsFormServer(this.paginateData,val);
    
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
        this.transactionService.getTransactionsFormServer(this.paginateData,this.statForm.value)
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
