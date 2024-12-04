import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';
import { AuthentificateService } from '../../../services/authentificate.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.css'
})
export class SidebarLeftComponent implements OnInit{
  constructor(private languageService:LanguageService, private authService:AuthentificateService){}
  ngOnInit(): void {
    
  }
}
