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
      appointments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
      
        if (dateA > dateB) {
          return -1;
        } else if (dateA < dateB) {
          return 1;
        } else {
          const timeA = a.appointment_time;
          const timeB = b.appointment_time;
      
          if (timeA > timeB) {
            return -1;
          } else if (timeA < timeB) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      this.allAppointments=appointments;
     });
    }
  }
}
