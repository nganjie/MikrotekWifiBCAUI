import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WifiZoneDetail } from '../../models/wifi-zone-detail.model';
import { WifiZoneService } from '../../services/wifi-zone.service';
import { PageEvent } from '@angular/material/paginator';
import { PaginateData } from '../../../models/paginate-data.model';
import { CreateWifiZoneComponent } from '../create-wifi-zone/create-wifi-zone.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-list-zone-wifi',
  templateUrl: './list-zone-wifi.component.html',
  styleUrl: './list-zone-wifi.component.css'
})
export class ListZoneWifiComponent implements OnInit{
  wifiZones$!:Observable<WifiZoneDetail[]>;
  loading$!:Observable<boolean>;
  itemsPerPage: number = 2;
  paginateData$!:Observable<PaginateData>;
  paginateData!:PaginateData;
  totaElement=0;
  pageEvent!: PageEvent;
  pageArray:number[]=[]
  itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
  page$ =new BehaviorSubject<number>(1);
  constructor(private languageService:LanguageService,private wifiZoneService:WifiZoneService,private modalService:NgbModal){}
  ngOnInit(): void {
    this.loading$=this.wifiZoneService.loading$;
    this.paginateData$=this.wifiZoneService.paginateData$
    this.paginateData$.subscribe(
      data=>{
        this.paginateData=data;
        this.totaElement=data.total??0
        this.changeChoiceItemPage()
        //this.itemsPerPage=data.per_page;

      }
    );
    this.wifiZones$=this.wifiZoneService.wifiZones$;
    this.wifiZoneService.getWifiZonesFormServer({current_page:1,per_page:this.itemsPerPage});
  }
  createWifiZone() {
    const modalRef =this.modalService.open(CreateWifiZoneComponent,{
      centered:true,
      backdrop:'static',
    });
    var reloadPgae:Observable<boolean>;
    reloadPgae=modalRef.componentInstance.realod;
    reloadPgae.subscribe(
      (b)=>{
        if(b){
          this.wifiZoneService.getWifiZonesFormServer(this.paginateData)
        }
      }
    )
  }
  updateWifiZone(wifiZone:WifiZoneDetail) {
    const modalRef =this.modalService.open(CreateWifiZoneComponent,{
      centered:true,
      backdrop:'static',
    });
    var reloadPgae:Observable<boolean>;
    reloadPgae=modalRef.componentInstance.realod;
    modalRef.componentInstance.typeOperation='update'
    modalRef.componentInstance.wifi_zone_id=wifiZone.id;
    reloadPgae.subscribe(
      (b)=>{
        if(b){
          this.wifiZoneService.getWifiZonesFormServer(this.paginateData)
        }
      }
    )
  }
  deleteWifiZone(wifiZone:WifiZoneDetail){
    this.wifiZoneService.deleteWifiZone(wifiZone.id);
  }
  pageChange(event:PageEvent):PageEvent {
    //if(event.pageSize!=this.itemsPerPage){}
    //this.itemsPerPage=event.pageSize;
    //this.itemsPerPage$.next(this.itemsPerPage)
    this.paginateData.current_page=event.pageIndex+1
    this.paginateData.per_page=event.pageSize;
    this.wifiZoneService.getWifiZonesFormServer(this.paginateData)
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
