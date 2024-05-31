import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentsService } from '../appointments.service';
import { TodayAppointment } from '../models/models';
import { difference } from '../models/models';
@Component({
  standalone:true,
  imports:[ToolbarComponent,MatDatepickerModule,MatNativeDateModule],
  selector: 'app-user-make-appointment',
  templateUrl: './user-make-appointment.component.html',
  styleUrl: './user-make-appointment.component.css'

})
export class UserMakeAppointmentComponent {
availablehours: string[] = [];
constructor(private router:Router, private appointmentsService:AppointmentsService){}
cancel(){
  this.router.navigate(['user-home']);
}
onDateSelected(date:any){
  let appointments: TodayAppointment[] = [];
  console.log("date selected:" + date);
  this.appointmentsService.getTodayAppointments(date).subscribe((appointments:string[]) => {
    console.log(appointments);
    this.availablehours=difference(appointments);
    console.log('HOLA'+this.availablehours);
  });

}
}
