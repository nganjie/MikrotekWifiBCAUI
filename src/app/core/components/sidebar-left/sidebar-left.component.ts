import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';
import { AuthentificateService } from '../../../services/authentificate.service';
import { LogOut } from '../../../models/data-server.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.css'
})
export class SidebarLeftComponent implements OnInit{
  constructor(private languageService:LanguageService,private router:Router, private authService:AuthentificateService){}
  ngOnInit(): void {
    
  }
  logOut(){
    /*localStorage.removeItem("appToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("roleUser")*/
    LogOut();
    this.router.navigateByUrl('/login');
  }
}
