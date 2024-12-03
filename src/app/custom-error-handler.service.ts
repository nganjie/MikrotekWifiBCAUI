import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler{
  _loggError$=new BehaviorSubject<boolean>(false)
  get loggerError$():Observable<boolean>{
    return this._loggError$.asObservable();
  }
  setLoggError(logger:boolean){
    this._loggError$.next(logger)
  }
  constructor(private snackBar:MatSnackBar,private router:Router) { }
  handleError(error: any): void {
    this.setLoggError(true)
    console.log(this._loggError$)
    if(error.status===401)
    {
      this.setLoggError(true)
      let config = new MatSnackBarConfig();
      config.duration=9000;
      config.panelClass=['red-snackbar']
      this.snackBar.open(
        "Erreur d'authentification , vous devez vous authentifier",
        "Close",
        config
      );
      console.log('popup modal')
      setTimeout(()=>{
        this.router.navigateByUrl('/login')
      },config.duration)
    }else if(error.status===422){
      let config = new MatSnackBarConfig();
      config.duration=9000;
      config.panelClass=['red-snackbar']
      this.snackBar.open(
        `${error.error.error}`,
        "Close",
        config
      );
    }
   
    console.warn('error :',error)
  }
}
