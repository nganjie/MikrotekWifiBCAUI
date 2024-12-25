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
  getticketWifisFormServer(paginateD:PaginateData){
    const headers=this.getHearder();
    this.setLoadStatus(true)
   let pagin =this.explosePaginationOption(paginateD);
    this.http.get<DataServerPaginate<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/ticket-wifi/all?${pagin}`,headers).pipe(
      map(dataServer=>{
        console.log(dataServer);
        this._ticketWifis$.next(dataServer.data?.data??[])
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
    this.http.post<DataServerSingleton<any>>(`${environment.apiUrlFirst}/admin/ticket-wifi/${id}/import`,form,this.headers).pipe(
        tap(data=>{
            console.log(data)
            if(data.success){
                console.log(data)
              this.setSnackMesage('Tickets WI-FI Imported successfully')
               this.setLoadStatus(true)
               this.setConfirmSubmit(true)
            }else{
                this._error$.next({status:false,message:data.error})
            }
            
        })
    ).subscribe()
  }
  updateticketWifi(form:FormGroup,wifi_zone_id:string){
    const headers=this.getHearder();
    this.http.put<DataServerSingleton<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/update`,form.value,headers).pipe(
      tap(data=>{
        if(data.success){
          console.log(data)
        this.setSnackMesage('Wifi-Zone Update successfully')
         this.setLoadStatus(true)
         this.setConfirmSubmit(true)
      }else{
          this._error$.next({status:false,message:data.error})
      }
      })
    ).subscribe()
  }
  deleteticketWifi(wifi_zone_id:string){
    const headers=this.getHearder();
    this.http.delete<DataServerSingleton<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/delete`,headers).pipe(
      tap(data=>{
        if(data.success){
          console.log(data)
        this.setSnackMesage('Wifi-Zone Deleted successfully')
         this.setLoadStatus(true)
         this.setConfirmSubmit(true)
      }else{
          this._error$.next({status:false,message:data.error})
      }
      })
    ).subscribe()
  }
  getTicketWifiDetail(wifi_zone_id:string):Observable<TicketWifiDetail>{
    const headers=this.getHearder();
    return this.http.get<DataServerSingleton<TicketWifiDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/detail`,headers).pipe(
      map(data=>data.data as TicketWifiDetail)
    )
  }
}

