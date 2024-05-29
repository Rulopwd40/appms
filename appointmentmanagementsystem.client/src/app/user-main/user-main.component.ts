import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css',
  imports: [MatToolbar],
})
export class UserMainComponent {
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
