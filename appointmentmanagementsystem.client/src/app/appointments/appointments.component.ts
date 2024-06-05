import { Component } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../models/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  
  isAdmin=false;
  allAppointments: Appointment[] = [];
  constructor(private appointmentsService:AppointmentsService,private datePipe:DatePipe){}

  ngOnInit(){
    this.isAdmin = (localStorage.getItem('isAdmin') == 'true');
    this.getAppointments()
  }
  getAppointments(){
    if(this.isAdmin){
     this.appointmentsService.getAppointments().subscribe(appointments =>{
      appointments.map(appointment =>
        appointment.date= appointment.date.toString().split('T')[0]
      )
      this.allAppointments=appointments;
     });
    }
  }
}
