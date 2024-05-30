import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  standalone:true,
  imports:[ToolbarComponent],
  selector: 'app-user-make-appointment',
  templateUrl: './user-make-appointment.component.html',
  styleUrl: './user-make-appointment.component.css'

})
export class UserMakeAppointmentComponent {
availablehours: string[] = [];

}
