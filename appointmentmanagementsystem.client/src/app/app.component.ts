import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from './app-data.service';
import { Router } from '@angular/router';
import { User, UserService } from './user.service';
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  formData: any;
  username='';
  logged=false;
  
  users: User[] = [];
  constructor(private http: HttpClient, private appDataService:AppDataService, private router:Router, private userservice:UserService) {}

  ngOnInit() {
    this.userservice.getUsers().subscribe(data => {this.users = data});
    this.appDataService.formData$.subscribe(data => {
      this.formData = data;
      this.username = data.username;
      this.logged=true;
    });
  }
  logout(){
    this.logged=false;
    this.router.navigate(['**']);
  }
  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'appointmentmanagementsystem.client';
}
