import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { LanguageService } from '../../../services/language/language.service';
import { TicketWifiDetail } from '../../models/ticket-wifi-detail.model';
import { TicketWifiService } from '../../service/ticket-wifi.service';
import { ImportTicketWifiComponent } from '../import-ticket-wifi/import-ticket-wifi.component';

@Component({
  selector: 'app-list-ticket-wifi',
  templateUrl: './list-ticket-wifi.component.html',
  styleUrl: './list-ticket-wifi.component.css'
})
export class ListTicketWifiComponent implements OnInit{
  @Input()pakage_wifi_id?:string
   ticketWifis$!:Observable<TicketWifiDetail[]>;
    loading$!:Observable<boolean>;
    itemsPerPage: number = 2;
    paginateData$!:Observable<PaginateData>;
    paginateData!:PaginateData;
    totaElement=0;
    pageEvent!: PageEvent;
    pageArray:number[]=[]
    itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
    page$ =new BehaviorSubject<number>(1);
    constructor(private languageService:LanguageService,private ticketWifiService:TicketWifiService,private modalService:NgbModal){}
    ngOnInit(): void {
      this.loading$=this.ticketWifiService.loading$;
      this.paginateData$=this.ticketWifiService.paginateData$
      this.paginateData$.subscribe(
        data=>{
          this.paginateData=data;
          this.totaElement=data.total??0
          this.changeChoiceItemPage()
          //this.itemsPerPage=data.per_page;
  
        }
      );
      this.ticketWifis$=this.ticketWifiService.ticketWifis$;
      console.log('pakage id : ',this.pakage_wifi_id)
      this.ticketWifiService.getticketWifisFormServer({current_page:1,per_page:this.itemsPerPage},this.pakage_wifi_id);
    }
    createticketWifi() {
      const modalRef =this.modalService.open(ImportTicketWifiComponent,{
        centered:true,
        backdrop:'static',
      });
      var reloadPgae:Observable<boolean>;
      modalRef.componentInstance.pakage_wifi_id=this.pakage_wifi_id;
      reloadPgae=modalRef.componentInstance.realod;
      reloadPgae.subscribe(
        (b)=>{
          if(b){
            this.ticketWifiService.getticketWifisFormServer(this.paginateData,this.pakage_wifi_id)
          }
        }
      )
    }
    deleteticketWifi(ticketWifi:TicketWifiDetail){
      this.ticketWifiService.deleteticketWifi(ticketWifi.id);
    }
    pageChange(event:PageEvent):PageEvent {
      //if(event.pageSize!=this.itemsPerPage){}
      //this.itemsPerPage=event.pageSize;
      //this.itemsPerPage$.next(this.itemsPerPage)
      this.paginateData.current_page=event.pageIndex+1
      this.paginateData.per_page=event.pageSize;
      this.ticketWifiService.getticketWifisFormServer(this.paginateData,this.pakage_wifi_id)
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
