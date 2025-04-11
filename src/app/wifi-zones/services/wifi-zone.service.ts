import { Injectable } from '@angular/core';
import { GlobalServices } from '../../services/global.services';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { WifiZoneDetail } from '../models/wifi-zone-detail.model';
import { DataServer, ApiPaginatedResponse, ApiResponse } from '../../models/data-server.model';
import { environment } from '../../../environments/environment';
import { PaginateData } from '../../models/paginate-data.model';
import { FormGroup } from '@angular/forms';
import { PakageWifiDetail } from '../../pakage-wifi/models/pakage-wifi-detail.model';

@Injectable({
  providedIn: 'root'
})
export class WifiZoneService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
    super(https,snak)
  }
  _wifiZones$=new BehaviorSubject<WifiZoneDetail[]>([]);
  get wifiZones$():Observable<WifiZoneDetail[]>{
    return this._wifiZones$.asObservable();
  }
  getWifiZonesFormServer(paginateD:PaginateData){
    const headers=this.getHearder();
    this.setLoadStatus(true)
   let pagin =this.explosePaginationOption(paginateD);
    this.http.get<ApiPaginatedResponse<WifiZoneDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/all?${pagin}`,headers).pipe(
      map(dataServer=>{
        console.log(dataServer);
        this._wifiZones$.next(dataServer.data?.data??[])
        this.setLoadStatus(false)
        this._paginateData$.next({
          current_page:dataServer.data?.current_page??1,
          per_page:dataServer.data?.per_page??1,
          total:dataServer.data?.total??1,
        })
      })
    ).subscribe()
  }
  getWifiZonesFullFormServer(){
    const headers=this.getHearder();
    this.setLoadStatus(true)
    this.http.get<ApiResponse<WifiZoneDetail[]>>(`${environment.apiUrlFirst}/admin/wifi-zone/full-all?`,headers).pipe(
      map(dataServer=>{
        console.log(dataServer);
        this._wifiZones$.next(dataServer.data??[])
        this.setLoadStatus(false)
      })
    ).subscribe()
  }
  getPakageWifisFormServer(id:string):Observable<PakageWifiDetail[]>{
        const headers=this.getHearder();
       return  this.http.get<ApiResponse<PakageWifiDetail[]>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${id}/pakage-wifis`,headers).pipe(
          map(data=>data.data)
        )
      }
  createWifiZone(form:FormGroup) {

    this.http.post<ApiResponse<any>>(`${environment.apiUrlFirst}/admin/wifi-zone/create`,form.value,this.headers).pipe(
        tap(data=>{
            console.log(data)
            if(data.success){
                console.log(data)
              this.setSnackMesage('Wi-fi Zone create successfully')
               this.setLoadStatus(true)
               this.setConfirmSubmit(true)
            }else{
                this._error$.next({status:false,message:data.error})
            }
            
        })
    ).subscribe()
  }
  updateWifiZone(form:FormGroup,wifi_zone_id:string){
    const headers=this.getHearder();
    this.http.put<ApiResponse<WifiZoneDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/update`,form.value,headers).pipe(
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
  deleteWifiZone(wifi_zone_id:string){
    const headers=this.getHearder();
    this.http.delete<ApiResponse<WifiZoneDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/delete`,headers).pipe(
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
  getWifiZoneDetail(wifi_zone_id:string):Observable<WifiZoneDetail>{
    const headers=this.getHearder();
    return this.http.get<ApiResponse<WifiZoneDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/${wifi_zone_id}/detail`,headers).pipe(
      map(data=>data.data as WifiZoneDetail)
    )
  }
}
