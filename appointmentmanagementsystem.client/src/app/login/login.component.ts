import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';

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
show: boolean = false;
constructor(private router: Router, private appDataService: AppDataService) {};
  submitForm(){
    let isAdmin=false;
    if(this.loginform.value.username=="Tito"){
      isAdmin=true;
    }
    if(isAdmin){
      this.router.navigate(['admin-view'])
    }
    else this.router.navigate(['user-view']);
    this.appDataService.sendFormData(this.loginform.value);
  }
  register(){
    this.router.navigate(['register']);
  }
  showPassword(){
    this.show = !this.show;
  }
}
