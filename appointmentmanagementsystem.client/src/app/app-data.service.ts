import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private formDataSubject= new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();
  sendFormData(data: any) {
    this.formDataSubject.next(data);
  }
  constructor() { }
}
