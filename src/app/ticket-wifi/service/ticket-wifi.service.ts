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
import { TicketWifiDetail } from '../models/ticket-wifi-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TicketWifiService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
    super(https,snak)
  }
  _ticketWifis$=new BehaviorSubject<TicketWifiDetail[]>([]);
  get ticketWifis$():Observable<TicketWifiDetail[]>{
    return this._ticketWifis$.asObservable();
  }
  getticketWifisFormServer(paginateD:PaginateData,id:string|undefined){
    const headers=this.getHearder();
    const url =id?`admin/ticket-wifi/${id}/ticket-wifis`:`admin/ticket-wifi/all`
    //console.log(id);
    //console.log('url : ',url)
    this.setLoadStatus(true)
   let pagin =this.explosePaginationOption(paginateD);
    this.http.get<ApiPaginatedResponse<TicketWifiDetail>>(`${environment.apiUrlFirst}/${url}?${pagin}`,headers).pipe(
      map(dataServer=>{
        console.log(dataServer);
        this._ticketWifis$.next(dataServer.data?.data??[])
        this.setLoadStatus(false)
        this._paginateData$.next({
          current_page:dataServer.data?.current_page??1,
          per_page:dataServer.data?.per_page??1,
          total:dataServer.data?.total??1,
        })
      })
    ).subscribe()
  }
  importTicketWifi(form:FormData,id:string) {
    console.log(form);
    let headers=this.getHearder('mul')
    let formD=new FormData();
    //formD.append('tickets',form.getAll)
    console.log('header  : ',headers)
    //let upf=new FormData();
    //upf.append('tikects',form.get('tickets'))
   /* this.http.post(`${environment.apiUrlFirst}/admin/ticket-wifi/${id}/import`,form,headers).pipe(
        tap(data=>{
            console.log(data)
            if(data){
                console.log(data)
              this.setSnackMesage('Tickets WI-FI Imported successfully')
               this.setLoadStatus(true)
               this.setConfirmSubmit(true)
            }else{
                //this._error$.next({status:false,message:data.message})
            }
            
        })
    ).subscribe()*/
    this.http.post<ApiResponse<TicketWifiDetail>>(`http://localhost:8002/api/admin/ticket-wifi/${id}/import`, form,headers)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
  updateticketWifi(form:FormGroup,wifi_zone_id:string){
    const headers=this.getHearder();
    this.http.put<ApiResponse<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/update`,form.value,headers).pipe(
      tap(data=>{
        if(data.success){
          console.log(data)
        this.setSnackMesage('Wifi-Zone Update successfully')
         this.setLoadStatus(true)
         this.setConfirmSubmit(true)
      }else{
          this._error$.next({status:false,message:data.message})
      }
      })
    ).subscribe()
  }
  deleteticketWifi(wifi_zone_id:string){
    const headers=this.getHearder();
    this.http.delete<ApiResponse<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/ticket-wifi/${wifi_zone_id}/delete`,headers).pipe(
      tap(data=>{
        if(data.success){
          console.log(data)
        this.setSnackMesage('Wifi-Zone Deleted successfully')
         this.setLoadStatus(true)
         this.setConfirmSubmit(true)
      }else{
          this._error$.next({status:false,message:data.message})
      }
      })
    ).subscribe()
  }
  getTicketWifiDetail(wifi_zone_id:string):Observable<TicketWifiDetail>{
    const headers=this.getHearder();
    return this.http.get<ApiResponse<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/ticket-wifi/${wifi_zone_id}/details`,headers).pipe(
      map(data=>data.data as TicketWifiDetail)
    )
  }
}

