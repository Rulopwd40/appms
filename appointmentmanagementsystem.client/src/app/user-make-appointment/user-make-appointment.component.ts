import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentsService } from '../appointments.service';
import { TodayAppointment, Appointment} from '../models/models';
import { difference } from '../models/models';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[ToolbarComponent,MatDatepickerModule,MatNativeDateModule,CommonModule],
  selector: 'app-user-make-appointment',
  templateUrl: './user-make-appointment.component.html',
  styleUrl: './user-make-appointment.component.css'

})

export class UserMakeAppointmentComponent {
availablehours: string[] = [];
selectedHour: any;
acceptvalid:boolean=false;
date:any;

constructor(private router:Router, private appointmentsService:AppointmentsService){}

ngOnInit(){
this.acceptvalid = false;
}

cancel(){
  this.router.navigate(['user-home']);
}
onDateSelected(date:any){
  let appointments: TodayAppointment[] = [];
  this.date=date;
  this.appointmentsService.getTodayAppointments(date).subscribe((appointments:TodayAppointment[]) => {
    this.availablehours=difference(appointments,'08:00:00','16:00:00');
  });

}
selectHour(hour:string){
  this.selectedHour=hour;
  this.acceptvalid=true;
}
accept(){
  const username = localStorage.getItem('User');
  if (!username) {
    alert('Usuario no encontrado en el almacenamiento local');
    return;
  }

  let appointment: Appointment = {
    date: this.date,
    appointment_time: this.selectedHour + ':00', 
    username: username,
  };
  console.log(appointment);
  this.appointmentsService.addAppointment(appointment).subscribe(
    response => {
      alert('Cita registrada con éxito');
      this.router.navigate(['user-home']);
    },
    error => {
      console.error('Error al registrar la cita', error);
      if (error.status === 400 && error.error.errors) {
        console.error('Errores de validación:', error.error.errors);
        alert('Errores de validación: ' + JSON.stringify(error.error.errors));
      } else {
        alert('Error al registrar la cita');
      }
    }
  );
  }
}
