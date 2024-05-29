import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Binary } from '@angular/compiler';

export interface User{
  id_user?: number;
  username: string;
  password: string;
  email: string;
  name: string;
  lastname: string;
  is_admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // La direccion del controlador es /User (Fijarse codigo de UserController.cs)
  private apiUrl = 'https://localhost:7072/api/User';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}