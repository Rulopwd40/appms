import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { UserService,User } from '../user.service';
import { UserC,UserR } from '../models/models';
@Component({
  standalone:true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})


export class LoginComponent {
  
loginform = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
  
});


userc: UserC ={
  email:'',
  password:'',
};

show: boolean = false;
constructor(private router: Router, private appDataService: AppDataService,private userservice:UserService) {};
  login(){
    this.userc.email=this.loginform.get('username')?.value;
    this.userc.password=this.loginform.get('password')?.value;
    this.userservice.login(this.userc).subscribe((user:UserR)=>{
    if (user){
      if(user.is_admin){
        this.router.navigate(['admin-view'])
      }
      else this.router.navigate(['user-view']);
      this.appDataService.sendFormData(this.loginform.value);
      localStorage.setItem('User',user.username ?? '');
      localStorage.setItem('Logged','true');
      localStorage.setItem('isAdmin','${isAdmin}')
    }
  }
  )
  }
  register(){
    this.router.navigate(['register']);
  }
  showPassword(){
    this.show = !this.show;
  }
}
