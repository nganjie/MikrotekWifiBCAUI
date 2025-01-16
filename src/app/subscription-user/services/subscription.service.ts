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
import { PakageDetail } from '../models/pakage-detail.model';
import { PakageUserDetail } from '../models/pakage-user-detail.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)
    }
    _pakages$=new BehaviorSubject<PakageDetail[]>([]);
    get pakages$():Observable<PakageDetail[]>{
      return this._pakages$.asObservable();
    }
    getPakagesFormServer(){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.get<DataServerSingleton<PakageDetail[]>>(`${environment.apiUrlFirst}/admin/pakage/all`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this.setLoadStatus(false)
          this._pakages$.next(dataServer.data)
        })
      ).subscribe()
    }
    createpakage(form:FormGroup) {
  
      this.http.post<DataServerSingleton<any>>(`${environment.apiUrlFirst}/admin/pakage/create`,form.value,this.headers).pipe(
          tap(data=>{
              console.log(data)
              if(data.success){
                  console.log(data)
                this.setSnackMesage('Pakage create successfully')
                 this.setLoadStatus(true)
                 this.setConfirmSubmit(true)
              }else{
                  this._error$.next({status:false,message:data.error})
              }
              
          })
      ).subscribe()
    }
    updatepakage(form:FormGroup,pakage_id:string){
      const headers=this.getHearder();
      this.http.put<DataServerSingleton<PakageDetail>>(`${environment.apiUrlFirst}/admin/pakage/${pakage_id}/update`,form.value,headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Pakage Update successfully')
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.error})
        }
        })
      ).subscribe()
    }
   choicePakage(pakage_id:string){
      const headers=this.getHearder();
      this.http.post<DataServerSingleton<PakageDetail>>(`${environment.apiUrlFirst}/admin/pakage/${pakage_id}/choice-pakage-user`,{},headers).pipe(
        tap(data=>{
          if(data.success){
            console.log(data)
          this.setSnackMesage('Pakage Subscribed successfully')
           this.setConfirmSubmit(true)
        }else{
            this._error$.next({status:false,message:data.error})
        }
        })
      ).subscribe()
    }
    getCurrentPakageUser():Observable<PakageUserDetail>{
      const headers=this.getHearder();
      this.setLoadStatus(true)
      return this.http.get<DataServerSingleton<PakageUserDetail>>(`${environment.apiUrlFirst}/admin/pakage/current`,headers).pipe(
        map(dataServer=>dataServer.data)
      )
    }
      deletepakage(id:string){
        const headers=this.getHearder();
        this.http.delete<DataServerSingleton<PakageDetail>>(`${environment.apiUrlFirst}/admin/pakage/${id}/delete`,headers).pipe(
          tap(data=>{
            if(data.success){
              console.log(data)
            this.setSnackMesage('pakage Deleted successfully')
             this.setConfirmSubmit(true)
          }else{
              this._error$.next({status:false,message:data.error})
          }
          })
        ).subscribe()
      }
    getPakageDetail(pakage_id:string):Observable<PakageDetail>{
      const headers=this.getHearder();
      return this.http.get<DataServerSingleton<PakageDetail>>(`${environment.apiUrlFirst}/admin/pakage/${pakage_id}/details`,headers).pipe(
        map(data=>data.data as PakageDetail)
      )
    }
  }
