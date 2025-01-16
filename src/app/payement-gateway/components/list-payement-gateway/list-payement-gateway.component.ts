import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { PayementGatewayDetail } from '../../models/payement-gateway-detail.model';
import { CreatePayementGatewayComponent } from '../create-payement-gateway/create-payement-gateway.component';
import { PayementGatewayService } from '../../services/payement-gateway.service';

@Component({
  selector: 'app-list-payement-gateway',
  templateUrl: './list-payement-gateway.component.html',
  styleUrl: './list-payement-gateway.component.css'
})
export class ListPayementGatewayComponent implements OnInit{
  payementGateways$!:Observable<PayementGatewayDetail[]>;
    loading$!:Observable<boolean>;
    itemsPerPage: number = 2;
    paginateData$!:Observable<PaginateData>;
    paginateData!:PaginateData;
    totaElement=0;
    pageEvent!: PageEvent;
    pageArray:number[]=[]
    itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
    page$ =new BehaviorSubject<number>(1);
    constructor(private payementGatewayService:PayementGatewayService,private modalService:NgbModal){}
    ngOnInit(): void {
      this.loading$=this.payementGatewayService.loading$;
      this.paginateData$=this.payementGatewayService.paginateData$
      this.paginateData$.subscribe(
        data=>{
          this.paginateData=data;
          this.totaElement=data.total??0
          this.changeChoiceItemPage()
          //this.itemsPerPage=data.per_page;
  
        }
      );
      this.payementGateways$=this.payementGatewayService.payementGateways$;
      this.payementGatewayService.getpayementGatewaysFormServer({current_page:1,per_page:this.itemsPerPage});
    }
    createpayementGateway() {
      const modalRef =this.modalService.open(CreatePayementGatewayComponent,{
        centered:true,
        backdrop:'static',
      });
      var reloadPgae:Observable<boolean>;
      reloadPgae=modalRef.componentInstance.realod;
      reloadPgae.subscribe(
        (b)=>{
          if(b){
            this.payementGatewayService.getpayementGatewaysFormServer(this.paginateData)
          }
        }
      )
    }
    updatepayementGateway(payementGateway:PayementGatewayDetail) {
      const modalRef =this.modalService.open(CreatePayementGatewayComponent,{
        centered:true,
        backdrop:'static',
      });
      var reloadPgae:Observable<boolean>;
      reloadPgae=modalRef.componentInstance.realod;
      modalRef.componentInstance.typeOperation='update'
      modalRef.componentInstance.pakage_wifi_id=payementGateway.id;
      reloadPgae.subscribe(
        (b)=>{
          if(b){
            this.payementGatewayService.getpayementGatewaysFormServer(this.paginateData)
          }
        }
      )
    }
    deletepayementGateway(payementGateway:PayementGatewayDetail){
        this.payementGatewayService.deletepayementGateway(payementGateway.id);
      }
    pageChange(event:PageEvent):PageEvent {
      //if(event.pageSize!=this.itemsPerPage){}
      //this.itemsPerPage=event.pageSize;
      //this.itemsPerPage$.next(this.itemsPerPage)
      this.paginateData.current_page=event.pageIndex+1
      this.paginateData.per_page=event.pageSize;
      this.payementGatewayService.getpayementGatewaysFormServer(this.paginateData)
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

