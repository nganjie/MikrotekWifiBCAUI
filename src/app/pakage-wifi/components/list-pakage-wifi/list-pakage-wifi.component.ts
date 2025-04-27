import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { PakageWifiDetail } from '../../models/pakage-wifi-detail.model';
import { PakageWifiService } from '../../services/pakage-wifi.service';
import { CreatePakageWifiComponent } from '../create-pakage-wifi/create-pakage-wifi.component';

@Component({
  selector: 'app-list-pakage-wifi',
  templateUrl: './list-pakage-wifi.component.html',
  styleUrl: './list-pakage-wifi.component.css'
})
export class ListPakageWifiComponent implements OnInit{
  @Input()wifiZoneId?:string
  PakageWifis$!:Observable<PakageWifiDetail[]>;
    loading$!:Observable<boolean>;
    itemsPerPage: number = 2;
    paginateData$!:Observable<PaginateData>;
    paginateData!:PaginateData;
    totaElement=0;
    pageEvent!: PageEvent;
    pageArray:number[]=[]
    itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
    page$ =new BehaviorSubject<number>(1);
    constructor(private pakageWifiService:PakageWifiService,private modalService:NgbModal){}
    ngOnInit(): void {
      this.loading$=this.pakageWifiService.loading$;
      this.paginateData$=this.pakageWifiService.paginateData$
      this.paginateData$.subscribe(
        data=>{
          this.paginateData=data;
          this.totaElement=data.total??0
          this.changeChoiceItemPage()
          //this.itemsPerPage=data.per_page;
  
        }
      );
      this.PakageWifis$=this.pakageWifiService.pakageWifis$;
      console.log('id pakage wifi : ',this.wifiZoneId)
      this.pakageWifiService.getPakageWifisFormServer({current_page:1,per_page:this.itemsPerPage},this.wifiZoneId);
      this.pakageWifiService.listen('chan-demo', 'test.sent', (data) => {
        console.log('Notification reçue :', data);
        //this.notifications.push(data);
      });
      this.pakageWifiService.listen('user', 'transaction.sent', (data) => {
        console.log('Notification reçue :', data);
        //this.notifications.push(data);
      });
    }
    createPakageWifi() {
      const modalRef =this.modalService.open(CreatePakageWifiComponent,{
        centered:true,
        backdrop:'static',
      });
      modalRef.componentInstance.wifiZoneId=this.wifiZoneId
      var reloadPgae:Observable<boolean>;
      reloadPgae=modalRef.componentInstance.realod;
      reloadPgae.subscribe(
        (b)=>{
          if(b){
            this.pakageWifiService.getPakageWifisFormServer(this.paginateData,this.wifiZoneId)
          }
        }
      )
    }
    updatePakageWifi(PakageWifi:PakageWifiDetail) {
      const modalRef =this.modalService.open(CreatePakageWifiComponent,{
        centered:true,
        backdrop:'static',
      });
      var reloadPgae:Observable<boolean>;
      reloadPgae=modalRef.componentInstance.realod;
      modalRef.componentInstance.typeOperation='update'
      modalRef.componentInstance.pakage_wifi_id=PakageWifi.id;
      modalRef.componentInstance.wifiZoneId=this.wifiZoneId
      reloadPgae.subscribe(
        (b)=>{
          if(b){
            this.pakageWifiService.getPakageWifisFormServer(this.paginateData,this.wifiZoneId)
          }
        }
      )
    }
    deletePakageWifi(pakageWifi:PakageWifiDetail){
        this.pakageWifiService.deletePakageWifi(pakageWifi.id);
      }
    pageChange(event:PageEvent):PageEvent {
      //if(event.pageSize!=this.itemsPerPage){}
      //this.itemsPerPage=event.pageSize;
      //this.itemsPerPage$.next(this.itemsPerPage)
      this.paginateData.current_page=event.pageIndex+1
      this.paginateData.per_page=event.pageSize;
      this.pakageWifiService.getPakageWifisFormServer(this.paginateData,this.wifiZoneId)
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
