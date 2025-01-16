import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { PakageDetail } from '../../models/pakage-detail.model';
import { SubscriptionService } from '../../services/subscription.service';
import { CreatePakageComponent } from '../create-pakage/create-pakage.component';

@Component({
  selector: 'app-list-pakage',
  templateUrl: './list-pakage.component.html',
  styleUrl: './list-pakage.component.css'
})
export class ListPakageComponent implements OnInit{
  pakages$!:Observable<PakageDetail[]>;
    loading$!:Observable<boolean>;
    itemsPerPage: number = 2;
    paginateData$!:Observable<PaginateData>;
    paginateData!:PaginateData;
    totaElement=0;
    pageEvent!: PageEvent;
    pageArray:number[]=[]
    confirmSubmit$!:Observable<boolean>;
    itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
    page$ =new BehaviorSubject<number>(1);
    constructor(private pakageService:SubscriptionService,private modalService:NgbModal){}
    ngOnInit(): void {
      this.loading$=this.pakageService.loading$;
      this.paginateData$=this.pakageService.paginateData$
      this.confirmSubmit$=this.pakageService.confirmSubmit$
      this.confirmSubmit$.subscribe(
        bo=>{
          this.pakageService.getPakagesFormServer();
        }
      )
      this.paginateData$.subscribe(
        data=>{
          this.paginateData=data;
          this.totaElement=data.total??0
          this.changeChoiceItemPage()
          //this.itemsPerPage=data.per_page;
  
        }
      );
      this.pakages$=this.pakageService.pakages$;
      this.pakageService.getPakagesFormServer();
    }
        createPakage() {
          const modalRef =this.modalService.open(CreatePakageComponent,{
            centered:true,
            backdrop:'static',
          });
          var reloadPgae:Observable<boolean>;
          reloadPgae=modalRef.componentInstance.realod;
          reloadPgae.subscribe(
            (b)=>{
              if(b){
                this.pakageService.getPakagesFormServer()
              }
            }
          )
        }
        updatePakage(Pakage:PakageDetail) {
          const modalRef =this.modalService.open(CreatePakageComponent,{
            centered:true,
            backdrop:'static',
          });
          var reloadPgae:Observable<boolean>;
          reloadPgae=modalRef.componentInstance.realod;
          modalRef.componentInstance.typeOperation='update'
          modalRef.componentInstance.pakage_wifi_id=Pakage.id;
          reloadPgae.subscribe(
            (b)=>{
              if(b){
                this.pakageService.getPakagesFormServer()
              }
            }
          )
        }
  

    deletepakage(pakage:PakageDetail){
        this.pakageService.deletepakage(pakage.id);
      }
    pageChange(event:PageEvent):PageEvent {
      //if(event.pageSize!=this.itemsPerPage){}
      //this.itemsPerPage=event.pageSize;
      //this.itemsPerPage$.next(this.itemsPerPage)
      this.paginateData.current_page=event.pageIndex+1
      this.paginateData.per_page=event.pageSize;
      //this.pakageService.getpakagesFormServer(this.paginateData)
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


