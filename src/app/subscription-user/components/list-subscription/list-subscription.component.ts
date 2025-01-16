import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { PakageDetail } from '../../models/pakage-detail.model';
import { SubscriptionService } from '../../services/subscription.service';
import { PakageUserDetail } from '../../models/pakage-user-detail.model';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrl: './list-subscription.component.css'
})
export class ListSubscriptionComponent implements OnInit{
  pakages$!:Observable<PakageDetail[]>;
    loading$!:Observable<boolean>;
    itemsPerPage: number = 2;
    paginateData$!:Observable<PaginateData>;
    paginateData!:PaginateData;
    pakageUser$!:Observable<PakageUserDetail>
    confirmSubmit$!:Observable<boolean>;
    totaElement=0;
    pageEvent!: PageEvent;
    pageArray:number[]=[]
    itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
    page$ =new BehaviorSubject<number>(1);
    constructor(private languageService:LanguageService,private pakageService:SubscriptionService,private modalService:NgbModal){}
    ngOnInit(): void {
      this.loading$=this.pakageService.loading$;
      this.paginateData$=this.pakageService.paginateData$
      this.confirmSubmit$=this.pakageService.confirmSubmit$
      this.confirmSubmit$.subscribe(
        bo=>{
          this.pakageService.getPakagesFormServer();
          const ob=this.pakageService.getCurrentPakageUser();
      ob.subscribe(
        data=>{
          console.log(data)
          this.pakageUser$=of(data)
        }
      )
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
      const ob=this.pakageService.getCurrentPakageUser();
      ob.subscribe(
        data=>{
          console.log(data)
          this.pakageUser$=of(data)
        }
      )
      this.pakages$=this.pakageService.pakages$;
      this.pakageService.getPakagesFormServer();
    }
    choicePakage(id:string){
      this.pakageService.choicePakage(id);
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

