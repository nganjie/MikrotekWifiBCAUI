import { Component, OnInit } from '@angular/core';
import { LogOut } from '../../../models/data-server.model';
import { LanguageService } from '../../../services/language/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-top',
  templateUrl: './sidebar-top.component.html',
  styleUrl: './sidebar-top.component.css'
})
export class SidebarTopComponent implements OnInit {
  constructor(private languageService:LanguageService,private router :Router){}
  ngOnInit(): void {
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
  isLanguage(lang:string):boolean{
    return lang===this.languageService.getCurrentLanguage();
  }
}
