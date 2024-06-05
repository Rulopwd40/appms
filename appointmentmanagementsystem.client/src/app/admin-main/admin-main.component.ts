import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../appointments.service';
import { TodayAppointment, TodayUserAppointment } from '../models/models';

@Component({
  standalone:true,
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css',
  imports:[ToolbarComponent],
  providers:[DatePipe],
})
export class AdminMainComponent {
  username: string | null | undefined;
  
  todayAppointments: TodayUserAppointment[]= [];
  nextAppointment?:TodayUserAppointment;
  ngOnInit(){
    //this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd') || '';
    this.username = localStorage.getItem('User');
    let date= new Date();
    this.getTodayAppointments(date);
    
    this.nextAppointment=this.todayAppointments[0];
  }
  constructor(private router:Router, private datePipe:DatePipe,private appointmentService:AppointmentsService ){}
  logout(){
    this.router.navigate(['**'])
    localStorage.setItem('Logged','false');
  }

  getTodayAppointments(date: Date) {
    this.appointmentService.getTodayAppointments(date).subscribe((todayAppointments: TodayUserAppointment[]) => {
      // Sort the appointments by appointment_time
      todayAppointments.sort((a, b) => {
        const [hoursA, minutesA] = a.appointment_time.split(':').map(Number);
        const [hoursB, minutesB] = b.appointment_time.split(':').map(Number);
  
        const totalMinutesA = hoursA * 60 + minutesA;
        const totalMinutesB = hoursB * 60 + minutesB;
  
        return totalMinutesA - totalMinutesB;
      });
  
      // Get the current time in HH:MM format
      const currentHour = this.datePipe.transform(new Date(), 'HH:mm') || '';
  
      // Filter appointments that are greater than or equal to the current time
      todayAppointments = todayAppointments.filter(d => d.appointment_time >= currentHour);
  
      // Assign the first appointment to nextAppointment and the rest to todayAppointments
      [this.nextAppointment, ...this.todayAppointments] = todayAppointments;
  
    }, error => {
      console.error('Error fetching today\'s appointments', error);
    });
  }


}
