import { Component, OnInit } from '@angular/core';
import { WithdrawalService } from '../../services/withdrawal.service';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { WithdrawalDetail } from '../../models/withdrawal-detail.model';
import { CreateWithdrawalComponent } from '../create-withdrawal/create-withdrawal.component';
import { LanguageService } from '../../../services/language/language.service';
import { RejectWithdrawalComponent } from '../reject-withdrawal/reject-withdrawal.component';

@Component({
  selector: 'app-list-withdrawal',
  templateUrl: './list-withdrawal.component.html',
  styleUrl: './list-withdrawal.component.css'
})
export class ListWithdrawalComponent implements OnInit{
  withdrawals$!:Observable<WithdrawalDetail[]>;
    loading$!:Observable<boolean>;
    itemsPerPage: number = 2;
    paginateData$!:Observable<PaginateData>;
    paginateData!:PaginateData;
    totaElement=0;
    pageEvent!: PageEvent;
    pageArray:number[]=[]
    confirmSubmit$!:Observable<boolean>;
    amounts=0;
    isAdmin=0;
    amounts$!:Observable<number>;
    itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
    page$ =new BehaviorSubject<number>(1);
    constructor(private languageService:LanguageService,private withdrawalService:WithdrawalService,private modalService:NgbModal){}
    ngOnInit(): void {
      this.loading$=this.withdrawalService.loading$;
      this.paginateData$=this.withdrawalService.paginateData$
      this.paginateData$.subscribe(
        data=>{
          this.paginateData=data;
          this.totaElement=data.total??0
          this.changeChoiceItemPage()
          //this.itemsPerPage=data.per_page;
          //<span class="badge badge-success">Completed</span>
  
        }
      );
      this.isAdmin=this.withdrawalService.currentUser.is_admin
      this.amounts$=this.withdrawalService.getWithdrawalsColletAmountFormServer();
      this.amounts$.subscribe(
        data=>{
          console.log("amount : ",data)
          this.amounts=data
          this.amounts$=of(data)
        }
      );
      this.confirmSubmit$=this.withdrawalService.confirmSubmit$
      this.confirmSubmit$.subscribe(
        bo=>{
          this.withdrawalService.getWithdrawalsFormServer({current_page:1,per_page:this.itemsPerPage});
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
      this.withdrawals$=this.withdrawalService.withdrawals$;
      this.withdrawalService.getWithdrawalsFormServer(this.paginateData);
    }
        createWithdrawal() {
          const modalRef =this.modalService.open(CreateWithdrawalComponent,{
            centered:true,
            backdrop:'static',
          });
          var reloadPgae:Observable<boolean>;
          reloadPgae=modalRef.componentInstance.realod;
          reloadPgae.subscribe(
            (b)=>{
              if(b){
                this.withdrawalService.getWithdrawalsFormServer(this.paginateData)
              }
            }
          )
        }
        updateWithdrawal(Withdrawal:WithdrawalDetail) {
          const modalRef =this.modalService.open(CreateWithdrawalComponent,{
            centered:true,
            backdrop:'static',
          });
          var reloadPgae:Observable<boolean>;
          reloadPgae=modalRef.componentInstance.realod;
          modalRef.componentInstance.typeOperation='update'
          modalRef.componentInstance.withdrawal_wifi_id=Withdrawal.id;
          reloadPgae.subscribe(
            (b)=>{
              if(b){
                this.withdrawalService.getWithdrawalsFormServer(this.paginateData)
              }
            }
          )
        }
        rejectWithdrawal(Withdrawal:WithdrawalDetail) {
          const modalRef =this.modalService.open(RejectWithdrawalComponent,{
            centered:true,
            backdrop:'static',
          });
          var reloadPgae:Observable<boolean>;
          reloadPgae=modalRef.componentInstance.realod;
          modalRef.componentInstance.typeOperation='update'
          modalRef.componentInstance.withdrawal_wifi_id=Withdrawal.id;
          reloadPgae.subscribe(
            (b)=>{
              if(b){
                this.withdrawalService.getWithdrawalsFormServer(this.paginateData)
              }
            }
          )
        }
  

    deletewithdrawal(withdrawal:WithdrawalDetail){
        this.withdrawalService.deletewithdrawal(withdrawal.id);
      }
      validwithdrawal(withdrawal:WithdrawalDetail){
        this.withdrawalService.validWithdrawal(withdrawal.id);
      }
    pageChange(event:PageEvent):PageEvent {
      //if(event.pageSize!=this.itemsPerPage){}
      //this.itemsPerPage=event.pageSize;
      //this.itemsPerPage$.next(this.itemsPerPage)
      this.paginateData.current_page=event.pageIndex+1
      this.paginateData.per_page=event.pageSize;
      this.withdrawalService.getWithdrawalsFormServer(this.paginateData)
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