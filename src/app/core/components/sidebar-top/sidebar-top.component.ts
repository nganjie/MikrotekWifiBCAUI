import { Component, OnInit } from '@angular/core';
import { CurrentUser, LogOut } from '../../../models/data-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { CurrentUserDetailComponent } from '../current-user-detail/current-user-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html',
  styleUrl: './sidebar-top.component.css'
})
export class SidebarTopComponent implements OnInit {
  currentUser!:User;
  constructor(private languageService:LanguageService,private router :Router,private modalService:NgbModal){}
  ngOnInit(): void {
   this.currentUser= CurrentUser()
  }
  logOut(){
    LogOut();
    this.router.navigateByUrl('/login');
  }
  setEnLanguage(){
    this.languageService.setLanguage('en')
    window.location.reload()
  }
  setFrLanguage(){
    this.languageService.setLanguage('fr')
    window.location.reload()
  }
  viewCurentUser(){
    const modalRef =this.modalService.open(CurrentUserDetailComponent,{
      centered:true,
      backdrop:'static'
    });
  }
  isLanguage(lang:string):boolean{
    return lang===this.languageService.getCurrentLanguage();
  }
}
