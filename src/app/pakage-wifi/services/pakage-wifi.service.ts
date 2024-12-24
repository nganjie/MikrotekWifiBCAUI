import { Injectable } from '@angular/core';
import { GlobalServices } from '../../services/global.services';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DataServerPaginate, DataServerSingleton } from '../../models/data-server.model';
import { PaginateData } from '../../models/paginate-data.model';
import { PakageWifiDetail } from '../models/pakage-wifi-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PakageWifiService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)
    }
    _PakageWifis$=new BehaviorSubject<PakageWifiDetail[]>([]);
    get PakageWifis$():Observable<PakageWifiDetail[]>{
      return this._PakageWifis$.asObservable();
    }
    getPakageWifisFormServer(paginateD:PaginateData){
      const headers=this.getHearder();
      this.setLoadStatus(true)
     let pagin =this.explosePaginationOption(paginateD);
      this.http.get<DataServerPaginate<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/pakage-wifi/all?${pagin}`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this._PakageWifis$.next(dataServer.data?.data??[])
          this._paginateData$.next({
            current_page:dataServer.data?.current_page??1,
            per_page:dataServer.data?.per_page??1,
            total:dataServer.data?.total??1,
          })
        })
      ).subscribe()
    }
    createPakageWifi(form:FormGroup,zone_wifi_id:string) {
  
      this.http.post<DataServerSingleton<any>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${zone_wifi_id}/create`,form.value,this.headers).pipe(
          tap(data=>{
              console.log(data)
              if(data.success){
                  console.log(data)
                this.setSnackMesage('Pakage Wi-fi create successfully')
                 this.setLoadStatus(true)
                 this.setConfirmSubmit(true)
              }else{
                  this._error$.next({status:false,message:data.error})
              }
              
          })
      ).subscribe()
    }
    updatePakageWifi(form:FormGroup,wifi_zone_id:string){
      const headers=this.getHearder();
      this.http.put<DataServerSingleton<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${wifi_zone_id}/update`,form.value,headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Pakage-Wifi Update successfully')
           this.setLoadStatus(true)
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.error})
        }
        })
      ).subscribe()
    }
    getPakageWifiDetail(wifi_zone_id:string):Observable<PakageWifiDetail>{
      const headers=this.getHearder();
      return this.http.get<DataServerSingleton<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${wifi_zone_id}/details`,headers).pipe(
        map(data=>data.data as PakageWifiDetail)
      )
    }
}
