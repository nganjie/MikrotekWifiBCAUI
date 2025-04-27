import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiPaginatedResponse, ApiResponse } from '../../models/data-server.model';
import { GlobalServices } from '../../services/global.services';
import { DashboardStatDetail } from '../models/dashboard-stat-detail.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)
    }
    _dashboardStat$=new BehaviorSubject<DashboardStatDetail>({totalAmount:[],stats:[]});
    get dashboardStat$():Observable<DashboardStatDetail>{
      return this._dashboardStat$.asObservable();
    }
    getDashboardStatFormServer(form:FormData){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.post<ApiResponse<DashboardStatDetail>>(`${environment.apiUrlFirst}/admin/dashboard/all`,form,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this.setLoadStatus(false)
          this._dashboardStat$.next(dataServer.data)
        })
      ).subscribe()
    }

      deleteuser(id:string){
        const headers=this.getHearder();
        this.http.delete<ApiResponse<DashboardStatDetail>>(`${environment.apiUrlFirst}/admin/user-care/${id}/delete`,headers).pipe(
          tap(data=>{
            if(data.success){
              console.log(data)
            this.setSnackMesage('user Deleted successfully')
             this.setConfirmSubmit(true)
          }else{
              this._error$.next({status:false,message:data.message})
          }
          })
        ).subscribe()
      }

    getDashboardStatDetail(user_id:string):Observable<DashboardStatDetail>{
      const headers=this.getHearder();
      return this.http.get<ApiResponse<DashboardStatDetail>>(`${environment.apiUrlFirst}/admin/user-care/${user_id}/details`,headers).pipe(
        map(data=>data.data as DashboardStatDetail)
      )
    }
  }
