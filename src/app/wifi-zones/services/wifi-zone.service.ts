import { Injectable } from '@angular/core';
import { GlobalServices } from '../../services/global.services';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { WifiZoneDetail } from '../models/wifi-zone-detail.model';
import { DataServer, DataServerPaginate } from '../../models/data-server.model';
import { environment } from '../../../environments/environment';

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
  getWifiZonesFormServer(){
    const headers=this.getHearder();
    this.setLoadStatus(true)
    this.http.get<DataServerPaginate<WifiZoneDetail>>(`${environment.apiUrlFirst}/admin/wifi-zone/all`,headers).pipe(
      map(dataServer=>{
        console.log(dataServer);
        this._wifiZones$.next(dataServer.data?.data??[])
      })
    ).subscribe()
  }
}
