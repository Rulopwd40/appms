import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AppointmentsService } from '../appointments.service';
import { UserAppointment } from '../models/models';

@Component({
  standalone: true,
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css',
  imports: [ToolbarComponent,MatIconModule],
})

export class UserMainComponent {
  username: string ="";
  appointments?: UserAppointment[];
  dates:string[] = [];
  
  constructor(private router:Router, private appointmentService:AppointmentsService){}
  
  
  ngOnInit(){
    const username= localStorage.getItem('User');
    if(username){
      this.username=username;
    }
    
    this.appointmentService.getUserAppointments(this.username).subscribe((appointments: UserAppointment[]) => {
      this.appointments = appointments;
      
      this.appointments.map( (appointment: UserAppointment) => 
        appointment.date=this.modifyDate(appointment.date))
    });
    
  }
  modifyDate(date: Date): string {
    return date.toString().split("T")[0];
  }
  logout(){
    this.router.navigate(['**'])
    localStorage.setItem('Logged','false');
  }
  makeappointment(){
    this.router.navigate(['makeappointment']);
  }

  //Borra y actualiza pagina
  deleteAppointment(appointment:UserAppointment){
    this.appointmentService.deleteAppointment(appointment).subscribe(() => {
    this.ngOnInit();
  })};
}
