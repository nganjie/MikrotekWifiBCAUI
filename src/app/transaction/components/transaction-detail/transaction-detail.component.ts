import { Component, Input, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LanguageService } from '../../../services/language/language.service';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDetail } from '../../models/transaction-detail.model';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css'
})
export class TransactionDetailComponent {
  @Input() transactionId!:string;
  loading$!:Observable<boolean>;
  transaction$!:Observable<TransactionDetail>;
  constructor(@Optional() private readonly activeModal:NgbActiveModal,private languageService:LanguageService,private transactionsServices:TransactionService,private route :ActivatedRoute){}
  ngOnInit(): void {
    this.initObservable()
  }
  initObservable(){
    this.loading$=this.transactionsServices.loading$
    //this.transaction$=this.transactionsServices.transaction$
    this.transaction$=this.transactionsServices.getTransactionDetail(this.transactionId)
    this.transaction$.subscribe();
    /*this.route.params.pipe(
      map(params=>this.transactionsServices.gettransactionDetailFromServer(params['id']))
    ).subscribe()*/
  }
  dismiss():void{
    if(this.activeModal)
    {
      this.activeModal.dismiss()
    }
      
  }
}
