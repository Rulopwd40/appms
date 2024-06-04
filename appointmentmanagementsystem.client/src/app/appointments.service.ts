import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, UserAppointment } from './models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  
  
  private apiUrl = 'http://localhost:5298/api';
  
  constructor(private http:HttpClient) { }

  getAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiUrl + '/Appointments');
  }

  getTodayAppointments(date:Date): Observable<any> {
    // Convertir el objeto Date a una cadena en el formato 'YYYY-MM-DD'
  let dateString = date.toISOString().split('T')[0];
  
  // Crear los parámetros de la solicitud
  let params = new HttpParams().set('date', dateString);

  // Realizar la solicitud GET con los parámetros
  return this.http.get<any>(this.apiUrl + '/Appointments/today', { params: params });
  }
  getUserAppointments(username: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Appointments/user?username=${username}`);
  }

  addAppointment(appointment: Appointment): Observable<any>{
    console.log(appointment);
    return this.http.post<any>(this.apiUrl + '/Appointments', appointment);
  }
  
  deleteAppointment(userAppointment: UserAppointment): Observable<any> {
    const params = new HttpParams()
      .set('date', userAppointment.date.toString())
      .set('appointment_time', userAppointment.appointment_time.toString());
  
    return this.http.delete<any>(`${this.apiUrl}/Appointments/delete`, { params });
  }
}
