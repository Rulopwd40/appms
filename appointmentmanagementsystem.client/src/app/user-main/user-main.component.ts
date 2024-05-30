import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from '../toolbar/toolbar.component';
@Component({
  standalone: true,
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css',
  imports: [ToolbarComponent,MatIconModule],
})
export class UserMainComponent {
  username: string | null | undefined;
 
  constructor(private router:Router){}
  logout(){
    this.router.navigate(['**'])
    localStorage.setItem('Logged','false');
  }
  makeappointment(){
    this.router.navigate(['makeappointment']);
  }
}
