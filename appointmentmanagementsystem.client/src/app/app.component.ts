import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from './app-data.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  formData: any;
  username='';
  logged=false;
  
  users: User[] = [];
  constructor(private http: HttpClient, private appDataService:AppDataService, private router:Router, private userservice:UserService) {}

  ngOnInit() {
    // Esto da error cuando inicia la app porque queres acceder a los usuarios los cuales no existen, a menos que los tengas guardados
    //this.userservice.getUsers().subscribe(data => { console.log(data) });
    
    //this.appDataService.formData$.subscribe(data => {
    //  this.formData = data;
    //  console.log(data);
    //  this.username = data.username;
    //  this.logged=true;
    //});
  }
  logout(){
    this.logged=false;
    this.router.navigate(['**']);
  }
  title = 'appointmentmanagementsystem.client';
}
