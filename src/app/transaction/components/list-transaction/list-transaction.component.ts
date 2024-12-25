import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginateData } from '../../../models/paginate-data.model';
import { LanguageService } from '../../../services/language/language.service';
import { TransactionDetail } from '../../models/transaction-detail.model';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

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
      itemsPerPage$=new BehaviorSubject<number>(this.itemsPerPage)
      page$ =new BehaviorSubject<number>(1);
      constructor(private languageService:LanguageService,private transactionService:TransactionService,private modalService:NgbModal){}
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
        this.transactions$=this.transactionService.transactions$;
        this.transactionService.getTransactionsFormServer({current_page:1,per_page:this.itemsPerPage});
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
        this.transactionService.getTransactionsFormServer(this.paginateData)
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
