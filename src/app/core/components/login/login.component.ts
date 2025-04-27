import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthentificateService } from '../../../services/authentificate.service';
import { ErrorServer } from '../../../models/error-server.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup;
  btnSubmit =false;
  loading$!:Observable<boolean>;
  userName !:FormControl
  password !:FormControl;
  login$!:Observable<boolean>;
  loginError!:Observable<boolean>;
  _error$!:Observable<ErrorServer>;
  errorMessage='';

  constructor(private formBuilder:FormBuilder,private authService:AuthentificateService,private router:Router){}
  ngOnInit(): void {
    this.login$=this.authService.login$;
    this.loading$=this.authService.loading$
    this._error$=this.authService.error$;
    this._error$.subscribe(
      (b)=>{
        if(b.message!=='erreur')
        {
          this.errorMessage=b.message;
        }
      }
    )
    this.userName =this.formBuilder.control('',Validators.required);
    this.password =this.formBuilder.control('',Validators.required)
    this.loginForm=this.formBuilder.group({
      userName:this.userName,
      password:this.password
    })

    this.loginError =this.loginForm.statusChanges.pipe(
      map(status=> status=="INVALID"&&this.loginForm.get('userName')?.value&&this.loginForm.get('password')?.valid)
    )

  }
  getFormErrors(ctrl:AbstractControl|null){
    if(ctrl?.hasError('required')){
      return "ce champ est réquis";
    }else{
      return "ce champ contient une erreurs"
    }
  }
  onSubmit():void{
    this.btnSubmit=true
    this.authService.autentificate(this.userName.value,this.password.value);
  }
}
