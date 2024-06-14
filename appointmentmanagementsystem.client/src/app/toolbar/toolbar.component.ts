import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {  Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from '../users/users.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { AccountComponent } from '../account/account.component';
import { NgComponentOutlet } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../models/models';

type Tab = 'users' | 'appointments' | 'account';

@Component({
  standalone:true,
  imports:[MatToolbar,MatIconModule,MatSidenavModule,NgComponentOutlet, CommonModule],
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  username: any;
  isClosed = true;
  menu: string= ""
  isPopupVisible: boolean = false;
  tab: Tab | '' = '';
  isAdmin = false;
  components = {
    '':null,
    users: UsersComponent,
    appointments: AppointmentsComponent,
    account: AccountComponent,
  };

  allAppointments?:Appointment[];
  constructor(private router:Router, private appointmentsService:AppointmentsService){}
  showPopup() {
    this.isPopupVisible = true;
    console.log(this.isPopupVisible);
  }

  hidePopup() {
    this.isPopupVisible = false;
    console.log(this.isPopupVisible);
  }
  ngOnInit(){
    this.username = localStorage.getItem('User');
    this.menu = "";
    this.tab='';
    
  }
  logout(){
    this.router.navigate(['**']),
    localStorage.setItem('Logged','false');
  }

  menuOpen() {
    if (this.menu !== "") {
      this.menu = "";
      this.hidePopup();
      if(this.tab !== ""){
        this.tab = "";
      }
    } else {
      if (localStorage.getItem('isAdmin') === "true") {
        this.menu = "admin-menu";
      } else if (localStorage.getItem('isAdmin') === "false") {
        this.menu = "user-menu";
      }
      this.showPopup();

    }
  }

  navClick(nav: Tab) {
    this.tab = nav;
  }

  selectedComponent() {
    return this.components[this.tab];
  }

  closeModal() {
    this.tab = "";
  }
}

