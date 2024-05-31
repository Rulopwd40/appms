import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {  Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  standalone:true,
  imports:[MatToolbar,MatIconModule],
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  username: any;
  
  
  constructor(private router:Router){}
  
  ngOnInit(){
    this.username = localStorage.getItem('User');

  }
  
  logout(){
    this.router.navigate(['**']),
    localStorage.setItem('Logged','false');
  }
}
