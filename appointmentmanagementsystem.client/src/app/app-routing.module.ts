import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { UserMainComponent } from './user-main/user-main.component';
import { RegisterComponent } from './register/register.component';
import { UserMakeAppointmentComponent } from './user-make-appointment/user-make-appointment.component';
import { UsersComponent } from './users/users.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'admin-home',component:AdminMainComponent},
  {path:'user-home',component:UserMainComponent},
  {path:'register',component:RegisterComponent},
  {path:'makeappointment',component:UserMakeAppointmentComponent},
  {path:'users',component:UsersComponent},
  {path:'appointments',component:AppointmentsComponent},
  {path:'account',component:AccountComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',redirectTo:'login'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
