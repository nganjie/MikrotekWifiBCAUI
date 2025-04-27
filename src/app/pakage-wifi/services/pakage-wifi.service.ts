import { Injectable } from '@angular/core';
import { GlobalServices } from '../../services/global.services';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiPaginatedResponse, ApiResponse } from '../../models/data-server.model';
import { PaginateData } from '../../models/paginate-data.model';
import { PakageWifiDetail } from '../models/pakage-wifi-detail.model';
import Pusher from 'pusher-js';
import { searchOption } from '../../models/search-option.model';

@Injectable({
  providedIn: 'root'
})
export class PakageWifiService extends GlobalServices{
  private pusher!: Pusher;
  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)

     /* this.pusher = new Pusher('bf5e228232638611c6c0', {
        cluster: 'eu', // Remplacez par votre cluster Pusher
      });
      
      this.echo.connector.socket.on('connect', () => {
        console.log('CONNECTED');
    });

    this.echo.connector.socket.on('reconnecting', () => {
        console.log('CONNECTING');
    });

    this.echo.connector.socket.on('disconnect', () => {
        console.log('DISCONNECTED');
    });

    this.echo.connector.socket.on('test.sent', (data:any) => {
       console.log('1', data);
    });

    this.echo.connector.socket.on('test.sent', (data:any) => {
        console.log('2', data);
    });

    this.echo.connector.socket.on('test.sent', (data:any) => {
        console.log('3', data);
    });

    this.echo.join('chan-demo').joining((data:any) => {
        console.log('joining', data);
    }).leaving((data:any) => {
        console.log('leaving', data);
    });*/

    /*this.echo.join('test2').joining((data:any) => {
        console.log('joining', data);
    }).leaving((data:any) => {
        console.log('leaving', data);
    });

    this.echo.channel('test').listen('.message.sent', (data:any) => {
        console.log('From laravel echo: ', data);
    });*/
    /*this.echo.channel('chan-demo').listen('.test.sent', (data:any) => {
        console.log('From laravel echo: ', data);
    });*/
    }
    listen(channel: string, event: string, callback: (data: any) => void): void {
      const pusherChannel = this.pusher.subscribe(channel);
      pusherChannel.bind(event, (data: any) => {
        callback(data);
      });
    }
  
    /**
     * Déconnecter Pusher
     */
    disconnect(): void {
      this.pusher.disconnect();
    }
  
    _PakageWifis$=new BehaviorSubject<PakageWifiDetail[]>([]);
    get pakageWifis$():Observable<PakageWifiDetail[]>{
      return this._PakageWifis$.asObservable();
    }
    getPakageWifisFormServer(paginateD:PaginateData,id:string|undefined){
      const headers=this.getHearder();
      this.setLoadStatus(true)
     let pagin =this.explosePaginationOption(paginateD);
     const url =id?`pakage-wifi/${id}/pakage-wifis`:`pakage-wifi/all`
      this.http.get<ApiPaginatedResponse<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/${url}?${pagin}`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this._PakageWifis$.next(dataServer.data?.data??[])
          this.setLoadStatus(false)
          this._paginateData$.next({
            current_page:dataServer.data?.current_page??1,
            per_page:dataServer.data?.per_page??1,
            total:dataServer.data?.total??1,
          })
        })
      ).subscribe()
    }
    getPakageWifisFullFormServer(searchOptions:searchOption[]=[]){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      const search =this.exploseSearchOption(searchOptions);
     const url =`pakage-wifi/full-all?${search}`
      this.http.get<ApiPaginatedResponse<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/${url}?${search}`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this._PakageWifis$.next(dataServer.data?.data??[])
          this.setLoadStatus(false)
          this._paginateData$.next({
            current_page:dataServer.data?.current_page??1,
            per_page:dataServer.data?.per_page??1,
            total:dataServer.data?.total??1,
          })
        })
      ).subscribe()
    }
    createPakageWifi(form:FormGroup,zone_wifi_id:string) {
      this.setLoadStatus(true);
      this.http.post<ApiResponse<any>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${zone_wifi_id}/create`,form.value,this.headers).pipe(
          tap(data=>{
              console.log(data)
              if(data.success){
                  console.log(data)
                this.setSnackMesage('Pakage Wi-fi create successfully')
                 this.setLoadStatus(false)
                 this.setConfirmSubmit(true)
              }else{
                  this._error$.next({status:false,message:data.message})
              }
              
          })
      ).subscribe()
    }
    updatePakageWifi(form:FormGroup,wifi_zone_id:string){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.put<ApiResponse<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${wifi_zone_id}/update`,form.value,headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Pakage-Wifi Update successfully')
           this.setLoadStatus(false)
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.message})
        }
        })
      ).subscribe()
    }
      deletePakageWifi(id:string){
        const headers=this.getHearder();
        this.http.delete<ApiResponse<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${id}/delete`,headers).pipe(
          tap(data=>{
            if(data.success){
              console.log(data)
            this.setSnackMesage('pakage-Wifi Deleted successfully')
             this.setLoadStatus(true)
             this.setConfirmSubmit(true)
          }else{
              this._error$.next({status:false,message:data.message})
          }
          })
        ).subscribe()
      }
    getPakageWifiDetail(wifi_zone_id:string):Observable<PakageWifiDetail>{
      const headers=this.getHearder();
      return this.http.get<ApiResponse<PakageWifiDetail>>(`${environment.apiUrlFirst}/admin/pakage-wifi/${wifi_zone_id}/details`,headers).pipe(
        map(data=>data.data as PakageWifiDetail)
      )
    }
}
