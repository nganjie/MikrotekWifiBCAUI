import { Injectable } from '@angular/core';
import { GlobalServices } from './global.services';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/data-server.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificateService extends GlobalServices{

  private _login$=new BehaviorSubject<boolean>(false);
    get login$():Observable<boolean>{
        return this._login$.asObservable();
    }
    setLoginStatus(login:boolean){
        this._login$.next(login);
    }
  constructor(private https:HttpClient,private snak :MatSnackBar,private router:Router){
    super(https,snak)
  }
  autentificate(userName:string|null,password:string|null){
    this.setLoadStatus(true);
    this.http.post<ApiResponse>(`${environment.apiUrlFirst}/auth/login`,{
        "email":userName,
        "password":password
    }).pipe(
        tap(dataServer=>{
            //const arr =Object.entries(dataServer)
            //var t =dataServer.valueOf()
            console.log(dataServer)
            console.log(dataServer.data);
           // console.log(dataServer.data?.user_roles[0].role);
            
            var d =JSON.stringify(dataServer);
            var dataServerJson=JSON.parse(d);
            console.log(dataServer)
            if(dataServer.success)
            {
                this.setLoginStatus(false)
                this.setLoadStatus(false);
                localStorage.setItem("currentUser",JSON.stringify(dataServer.data))
                localStorage.setItem('appToken',dataServer.message)
                this.router.navigateByUrl('/admin/wifi-zones');
                

            }else{
                this.setLoginStatus(true)

                this._error$.next({status:false,message:dataServer.error})
                //this.setSnackMesage(`${dataServer.error}`,'btn-danger')
            }
            
            /*for(const t of Object.i)
            {
                console.log(dataServer[t])
            }*/
        }),
    ).subscribe(
/*        dataServer=>console.log(dataServer),
        err=>console.log(err)*/
    )
}
}
