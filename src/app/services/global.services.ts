import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { ErrorServer } from "../models/error-server.model";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { User } from "../models/user.model";
import { PaginateData } from "../models/paginate-data.model";



export class GlobalServices{
    headers!:{headers:HttpHeaders};
    currentUser!:User;
    

    constructor(protected http:HttpClient,private snackBar:MatSnackBar){
        this.headers=this.getHearder()
        this.getCurrentUserBase()
    }
    getCurrentUserBase(){
        var data =localStorage.getItem('currentUser');
        if(data){
            var stringData =JSON.stringify(data);
            var jsonDataPrimary =JSON.parse(stringData)
            var jsonData =JSON.parse(jsonDataPrimary)
            //console.log('current User : ',jsonData)
            //this.roleCurrentUser=jsonData.user_roles[0].role.code;
            this.currentUser=jsonData //as CurrentUser;
           // this.roleCurrentUser=this.currentUser.user_roles.map(a=>a.role.code as RolesEnum) 
        }

    }
    tokenType  = 'Bearer ';
    lastLoaded=0
    _error$ =new BehaviorSubject<ErrorServer>({status:false,message:''})
    private _loading$ =new BehaviorSubject<boolean>(false)
    get error$():Observable<ErrorServer>{
        return this._error$.asObservable();
    }
    _confirmSubmit$=new BehaviorSubject<boolean>(false)
    get confirmSubmit$():Observable<boolean>{
        return this._confirmSubmit$.asObservable();
    }
    explosePaginationOption(data:PaginateData):string{
        let options=`per_page=${data.per_page}&page=${data.current_page}`;
        return options;
    }
    setConfirmSubmit(confirm:boolean){
        this._confirmSubmit$.next(true);
    }
    _paginateData$=new BehaviorSubject<PaginateData>({
        current_page:1,
        per_page:5,
        total:1
    })
    get paginateData$():Observable<PaginateData>{
        return this._paginateData$.asObservable();
    }

    exploseRoleArray(roles:string[]):string{
        let stringSearch='';
        let i=0;
        roles.forEach(s=>{
            if(i==0)
                stringSearch+=`${s}`;
            else
              stringSearch+=`,${s}`;
            i=1;
        })
        return stringSearch;
    }
    setError(error:{status:boolean,message:string}){
        this._error$.next(error);
    }
    get loading$():Observable<boolean>{
        return this._loading$.asObservable();
    }
    getHearder():{headers:HttpHeaders}
    {
        const token =localStorage.getItem('appToken');
        if(token){
            const header =new HttpHeaders().set("Authorization",this.tokenType+token);
        const headers= {headers:header};
        return {headers:header};
        }else{
            return {headers:new HttpHeaders()}
        }
        //console.log(token)
        
        
    }
    setLoadStatus(loading:boolean){
        this._loading$.next(loading);
    }
    setSnackMesage(message:string,color:string='btn-primary'){
        let config = new MatSnackBarConfig();
      config.duration=5000;
      config.panelClass=[color]
      this.snackBar.open(
        message,
        "Close",
        config
      );
      console.log('popup modal')

      }
    
}