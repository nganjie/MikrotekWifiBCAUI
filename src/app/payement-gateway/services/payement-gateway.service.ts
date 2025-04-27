import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiPaginatedResponse, ApiResponse } from '../../models/data-server.model';
import { PaginateData } from '../../models/paginate-data.model';
import { GlobalServices } from '../../services/global.services';
import { PayementGatewayDetail } from '../models/payement-gateway-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PayementGatewayService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)
    }
    _payementGateways$=new BehaviorSubject<PayementGatewayDetail[]>([]);
    get payementGateways$():Observable<PayementGatewayDetail[]>{
      return this._payementGateways$.asObservable();
    }
    getpayementGatewaysFormServer(paginateD:PaginateData){
      const headers=this.getHearder();
      this.setLoadStatus(true)
     let pagin =this.explosePaginationOption(paginateD);
      this.http.get<ApiPaginatedResponse<PayementGatewayDetail>>(`${environment.apiUrlFirst}/admin/payement-gateways/alls?${pagin}`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this._payementGateways$.next(dataServer.data?.data??[])
          this.setLoadStatus(false)
          this._paginateData$.next({
            current_page:dataServer.data?.current_page??1,
            per_page:dataServer.data?.per_page??1,
            total:dataServer.data?.total??1,
          })
        })
      ).subscribe()
    }
    createpayementGateway(form:FormGroup,zone_wifi_id:string) {
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.post<ApiResponse<any>>(`${environment.apiUrlFirst}/admin/payement-gateways/create`,form.value,headers).pipe(
          tap(data=>{
              console.log(data)
              if(data.success){
                  console.log(data)
                this.setSnackMesage('Payement Gateway  create successfully')
                 this.setLoadStatus(false)
                 this.setConfirmSubmit(true)
              }else{
                  this._error$.next({status:false,message:data.message})
              }
              
          })
      ).subscribe()
    }
    updatepayementGateway(form:FormGroup,wifi_zone_id:string){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.put<ApiResponse<PayementGatewayDetail>>(`${environment.apiUrlFirst}/admin/payement-gateways/${wifi_zone_id}/update`,form.value,headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Payement Gateway  Update successfully')
           this.setLoadStatus(false)
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.message})
        }
        })
      ).subscribe()
    }
      deletepayementGateway(id:string){
        const headers=this.getHearder();
        this.http.delete<ApiResponse<PayementGatewayDetail>>(`${environment.apiUrlFirst}/admin/Payement Gateway /${id}/delete`,headers).pipe(
          tap(data=>{
            if(data.success){
              console.log(data)
            this.setSnackMesage('Payement Gateway  Deleted successfully')
             this.setLoadStatus(true)
             this.setConfirmSubmit(true)
          }else{
              this._error$.next({status:false,message:data.message})
          }
          })
        ).subscribe()
      }
    getPayementGatewayDetail(wifi_zone_id:string):Observable<PayementGatewayDetail>{
      const headers=this.getHearder();
      return this.http.get<ApiResponse<PayementGatewayDetail>>(`${environment.apiUrlFirst}/admin/payement-gateways/${wifi_zone_id}/details`,headers).pipe(
        map(data=>data.data as PayementGatewayDetail)
      )
    }
}
