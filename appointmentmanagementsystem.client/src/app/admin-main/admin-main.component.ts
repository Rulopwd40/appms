import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  standalone:true,
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css',
  imports:[ToolbarComponent],
})
export class AdminMainComponent {
  username: string | null | undefined;
  ngOnInit(){
    this.username = localStorage.getItem('User');
  }
  constructor(private router:Router){}
  logout(){
    this.router.navigate(['**'])
    localStorage.setItem('Logged','false');
  }



}
