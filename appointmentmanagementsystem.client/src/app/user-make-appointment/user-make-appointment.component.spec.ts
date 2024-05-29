import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMakeAppointmentComponent } from './user-make-appointment.component';

describe('UserMakeAppointmentComponent', () => {
  let component: UserMakeAppointmentComponent;
  let fixture: ComponentFixture<UserMakeAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMakeAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMakeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
