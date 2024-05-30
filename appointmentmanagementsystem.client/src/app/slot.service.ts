import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  
  
  private apiUrl = 'http://localhost:5298/api';

  constructor(private http: HttpClient) { }

  
}
