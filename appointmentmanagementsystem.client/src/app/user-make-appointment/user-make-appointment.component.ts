import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  imports:[ToolbarComponent],
  selector: 'app-user-make-appointment',
  templateUrl: './user-make-appointment.component.html',
  styleUrl: './user-make-appointment.component.css'

})
export class UserMakeAppointmentComponent {
availablehours: string[] = [];
constructor(private router:Router){}
cancel(){
  this.router.navigate(['user-home']);
}
}
