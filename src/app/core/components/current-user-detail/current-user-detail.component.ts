import { Component, OnInit, Optional } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, tap } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthentificateService } from '../../../services/authentificate.service';
import { CurrentUser } from '../../../models/data-server.model';

@Component({
  selector: 'app-current-user-detail',
  templateUrl: './current-user-detail.component.html',
  styleUrl: './current-user-detail.component.css'
})
export class CurrentUserDetailComponent implements OnInit{
  currentUser?:User;
  constructor(@Optional() private readonly activeModal:NgbActiveModal,private authServices:AuthentificateService){}
  ngOnInit(): void {
    this.initInfo()
    this.currentUser= CurrentUser()
    
  }
  dismiss():void{
    if(this.activeModal)
    {
      this.activeModal.dismiss()
    }
      
  }
  initInfo(){
    /*var observe =this.authServices.getCurrentUser();
    observe.pipe(
      tap((dataServer)=>{
        //this.currentUser=dataServer.data;
        //this.roleUser=this.currentUser?.user_roles;
      })
    ).subscribe()*/
  }
}
