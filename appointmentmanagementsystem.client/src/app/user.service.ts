import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Binary } from '@angular/compiler';
import { User } from './models/models';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // La direccion del controlador es /User (Fijarse codigo de UserController.cs)
  // El port puede variar suele ser en http 5298 o https 7072
  private apiUrl = 'http://localhost:5298/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/Users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/Users', user);//Hay que utilizar esto para el login donde /Users/login
  }

  login(user: any): Observable<User>{
    console.log(user);
    return this.http.post<User>(this.apiUrl + '/Users/login',user);
  }
}
