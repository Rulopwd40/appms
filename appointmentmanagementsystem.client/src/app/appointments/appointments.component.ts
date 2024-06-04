import { Component } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../models/models';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  
  isAdmin=false;
  allAppointments: Appointment[] = [];
  constructor(private appointmentsService:AppointmentsService){}

  ngOnInit(){
    this.isAdmin = (localStorage.getItem('isAdmin') == 'true');
  }
  getAppointments(){
    if(this.isAdmin){
     this.appointmentsService.getAppointments().subscribe(appointments =>{
      appointments.sort((a, b) => {
        const [hoursA, minutesA] = a.appointment_time.split(':').map(Number);
        const [hoursB, minutesB] = b.appointment_time.split(':').map(Number);
  
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;
  
        return totalMinutesA - totalMinutesB;
      });
      this.allAppointments=appointments;
     });
    }
  }
}
