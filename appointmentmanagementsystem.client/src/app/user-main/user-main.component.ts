import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
  standalone: true,
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css',
  imports: [MatToolbar,MatIconModule],
})
export class UserMainComponent {
  username: string | null | undefined;
 
  constructor(private router:Router){}
  logout(){
    this.router.navigate(['**'])
    localStorage.setItem('Logged','false');
  }
}
