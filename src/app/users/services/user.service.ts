import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiPaginatedResponse, ApiResponse } from '../../models/data-server.model';
import { GlobalServices } from '../../services/global.services';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalServices{

  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
      super(https,snak)
    }
    _users$=new BehaviorSubject<User[]>([]);
    get users$():Observable<User[]>{
      return this._users$.asObservable();
    }
    getUsersFormServer(){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.get<ApiPaginatedResponse<User>>(`${environment.apiUrlFirst}/admin/user-care/all`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this.setLoadStatus(false)
          this._users$.next(dataServer.data?.data??[])
          this._paginateData$.next({
            current_page:dataServer.data?.current_page??1,
            per_page:dataServer.data?.per_page??1,
            total:dataServer.data?.total??1,
          })
        })
      ).subscribe()
    }
    getUsersFullFormServer(){
      const headers=this.getHearder();
      this.setLoadStatus(true)
      this.http.get<ApiResponse<User[]>>(`${environment.apiUrlFirst}/admin/user-care/full-all`,headers).pipe(
        map(dataServer=>{
          console.log(dataServer);
          this.setLoadStatus(false)
          this._users$.next(dataServer.data)
        })
      ).subscribe()
    }

      deleteuser(id:string){
        const headers=this.getHearder();
        this.http.delete<ApiResponse<User>>(`${environment.apiUrlFirst}/admin/user-care/${id}/delete`,headers).pipe(
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
      activeUser(user:User){
        const headers=this.getHearder();
        let action =user.is_activate?'desactivate':'activate'
        this.http.put<ApiResponse<User>>(`${environment.apiUrlFirst}/admin/user-care/${user.id}/${action}`,{},headers).pipe(
          tap(data=>{
            if(data.success){
              console.log(data)
            this.setSnackMesage(`user ${action} successfully`)
             this.setConfirmSubmit(true)
          }else{
              this._error$.next({status:false,message:data.message})
          }
          })
        ).subscribe()
      }
    getUser(user_id:string):Observable<User>{
      const headers=this.getHearder();
      return this.http.get<ApiResponse<User>>(`${environment.apiUrlFirst}/admin/user-care/${user_id}/details`,headers).pipe(
        map(data=>data.data as User)
      )
    }
  }
