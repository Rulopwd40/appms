import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodayAppointment, UserAppointment } from './models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  
  
  private apiUrl = 'http://localhost:5298/api';
  
  constructor(private http:HttpClient) { }

  getTodayAppointments(username: string,date:string): Observable<TodayAppointment[]> {
    let params = new HttpParams()
      .set('username', username)
      .set('date', date);
    return this.http.get<TodayAppointment[]>(this.apiUrl + '/Appointments/today', { params: params });
  }
  getUserAppointments(username: string): Observable<any>{
  
    return this.http.get<any>(`${this.apiUrl}/Appointments/user?username=${username}`);
  }
}
