import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WifiZoneDetail } from '../../models/wifi-zone-detail.model';
import { WifiZoneService } from '../../services/wifi-zone.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-zone-wifi',
  templateUrl: './list-zone-wifi.component.html',
  styleUrl: './list-zone-wifi.component.css'
})
export class ListZoneWifiComponent implements OnInit{
  wifiZones$!:Observable<WifiZoneDetail[]>;
  loading$!:Observable<boolean>;
  itemsPerPage: number = 5;
  totaElement=0;
  pageEvent!: PageEvent;
  pageArray:number[]=[]
  constructor(private wifiZoneService:WifiZoneService){}
  ngOnInit(): void {
    this.loading$=this.wifiZoneService.loading$;
    this.wifiZones$=this.wifiZoneService.wifiZones$;
    this.wifiZoneService.getWifiZonesFormServer();
  }
  pageChange(event:PageEvent):PageEvent {
    return event;
  }
}
