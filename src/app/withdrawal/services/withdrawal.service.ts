import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiPaginatedResponse, ApiResponse } from '../../models/data-server.model';
import { GlobalServices } from '../../services/global.services';
import { PakageUserDetail } from '../../subscription-user/models/pakage-user-detail.model';
import { WithdrawalDetail } from '../models/withdrawal-detail.model';
import { PaginateData } from '../../models/paginate-data.model';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)
    }
    _withdrawals$=new BehaviorSubject<WithdrawalDetail[]>([]);
    get withdrawals$():Observable<WithdrawalDetail[]>{
      return this._withdrawals$.asObservable();
    }

    getWithdrawalsFormServer(paginateD:PaginateData){
      const headers=this.getHearder();
      let pagin =this.explosePaginationOption(paginateD);
      this.setLoadStatus(true)
      this.http.get<ApiPaginatedResponse<WithdrawalDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/all?${pagin}`,headers).pipe(
        map(dataServer=>{
          this._withdrawals$.next(dataServer.data?.data??[])
        this.setLoadStatus(false)
        this._paginateData$.next({
          current_page:dataServer.data?.current_page??1,
          per_page:dataServer.data?.per_page??1,
          total:dataServer.data?.total??1,
        })
        })
      ).subscribe()
    }
    getWithdrawalsColletAmountFormServer():Observable<number>{
      const headers=this.getHearder();
      this.setLoadStatus(true)
      return this.http.get<ApiResponse<number>>(`${environment.apiUrlFirst}/admin/money-withdrawals/amounts`,headers).pipe(
        map(dataServer=>dataServer.data)
      );
    }
    createwithdrawal(form:FormGroup) {
      this.setLoadStatus(true)
      this.http.post<ApiResponse<any>>(`${environment.apiUrlFirst}/admin/money-withdrawals/create`,form.value,this.headers).pipe(
          tap(data=>{
              console.log(data)
              if(data.success){
                  console.log(data)
                this.setSnackMesage('Withdrawal create successfully')
                 this.setLoadStatus(false)
                 this.setConfirmSubmit(true)
              }else{
                this.setSnackMesage(data.message,'btn-warning')
                  this._error$.next({status:false,message:data.message})
              }
              
          })
      ).subscribe()
    }
    rejectWithdrawal(form:FormGroup,id:string) {
  
      this.http.put<ApiResponse<any>>(`${environment.apiUrlFirst}/admin/money-withdrawals/${id}/reject-withdrawal`,form.value,this.headers).pipe(
          tap(data=>{
              console.log(data)
              if(data.success){
                  console.log(data)
                this.setSnackMesage('Withdrawal rejected successfully')
                 this.setLoadStatus(true)
                 this.setConfirmSubmit(true)
              }else{
                this.setSnackMesage(data.message,'btn-warning')
                  this._error$.next({status:false,message:data.message})
              }
              
          })
      ).subscribe()
    }
    validWithdrawal(id:string) {
  
      this.http.put<ApiResponse<any>>(`${environment.apiUrlFirst}/admin/money-withdrawals/${id}/valid-withdrawal`,{},this.headers).pipe(
          tap(data=>{
             // console.log(data)
              if(data.success){
                  //console.log(data)
                this.setSnackMesage('Withdrawal valid successfully')
                 this.setLoadStatus(true)
                 this.setConfirmSubmit(true)
              }else{
                this.setSnackMesage(data.message,'btn-warning')
                  this._error$.next({status:false,message:data.message})
              }
              
          })
      ).subscribe()
    }
    updatewithdrawalUserMessage(send_message:boolean){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.post<ApiResponse<PakageUserDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/is-sms`,{
        is_send_message:send_message
      },headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
            this.setLoadStatus(false)
          this.setSnackMesage('Withdrawal Update successfully')
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.message})
        }
        })
      ).subscribe()
    }
    updatewithdrawal(form:FormGroup,withdrawal_id:string){
      const headers=this.getHearder();
      this.http.put<ApiResponse<WithdrawalDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/${withdrawal_id}/update`,form.value,headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Withdrawal Update successfully')
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.message})
        }
        })
      ).subscribe()
    }
   choicePakage(withdrawal_id:string){
      const headers=this.getHearder();
      this.http.post<ApiResponse<WithdrawalDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/${withdrawal_id}/choice-withdrawal-user`,{},headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Withdrawal Subscribed successfully')
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.message})
        }
        })
      ).subscribe()
    }
    getCurrentPakageUser():Observable<PakageUserDetail>{
      const headers=this.getHearder();
      this.setLoadStatus(true)
      return this.http.get<ApiResponse<PakageUserDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/current`,headers).pipe(
        map(dataServer=>dataServer.data)
      )
    }
      deletewithdrawal(id:string){
        const headers=this.getHearder();
        this.http.delete<ApiResponse<WithdrawalDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/${id}/delete`,headers).pipe(
          tap(data=>{
            if(data.success){
              console.log(data)
            this.setSnackMesage('withdrawal Deleted successfully')
             this.setConfirmSubmit(true)
          }else{
              this._error$.next({status:false,message:data.message})
          }
          })
        ).subscribe()
      }
    getPakageDetail(withdrawal_id:string):Observable<WithdrawalDetail>{
      const headers=this.getHearder();
      return this.http.get<ApiResponse<WithdrawalDetail>>(`${environment.apiUrlFirst}/admin/money-withdrawals/${withdrawal_id}/details`,headers).pipe(
        map(data=>data.data as WithdrawalDetail)
      )
    }
  }
