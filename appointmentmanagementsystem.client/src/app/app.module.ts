import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from './user.service';
import { UserMakeAppointmentComponent } from './user-make-appointment/user-make-appointment.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DatePipe } from '@angular/common'; 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,MatToolbarModule
  ],
  providers: [
    provideAnimationsAsync(),
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
