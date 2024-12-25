import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataServerPaginate, DataServerSingleton } from '../../models/data-server.model';
import { PaginateData } from '../../models/paginate-data.model';
import { GlobalServices } from '../../services/global.services';
import { TransactionDetail } from '../models/transaction-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
    super(https,snak)
  }
  _transactions$=new BehaviorSubject<TransactionDetail[]>([]);
  get transactions$():Observable<TransactionDetail[]>{
    return this._transactions$.asObservable();
  }
  getTransactionsFormServer(paginateD:PaginateData){
    const headers=this.getHearder();
    this.setLoadStatus(true)
   let pagin =this.explosePaginationOption(paginateD);
    this.http.get<DataServerPaginate<TransactionDetail>>(`${environment.apiUrlFirst}/admin/transactions/alls?${pagin}`,headers).pipe(
      map(dataServer=>{
        console.log(dataServer);
        this._transactions$.next(dataServer.data?.data??[])
        this._paginateData$.next({
          current_page:dataServer.data?.current_page??1,
          per_page:dataServer.data?.per_page??1,
          total:dataServer.data?.total??1,
        })
      })
    ).subscribe()
  }
  getTransactionDetail(transaction_id:string):Observable<TransactionDetail>{
    const headers=this.getHearder();
    return this.http.get<DataServerSingleton<TransactionDetail>>(`${environment.apiUrlFirst}/admin/transactions/${transaction_id}/details`,headers).pipe(
      map(data=>data.data as TransactionDetail)
    )
  }
}


