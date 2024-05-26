import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { UserMainComponent } from './user-main/user-main.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'admin-view',component:AdminMainComponent},
  {path:'user-view',component:UserMainComponent},
  {path:'**',redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
