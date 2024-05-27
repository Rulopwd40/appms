import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports:[ReactiveFormsModule,CommonModule],
})
export class RegisterComponent {
registerform= new FormGroup({
 username: new FormControl('',[Validators.required,Validators.minLength(4)]),
 password: new FormControl('', [Validators.required, Validators.minLength(6)]),
 confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
 name: new FormControl('', Validators.required),
 surname: new FormControl('', Validators.required),
 email: new FormControl('', [Validators.required, Validators.email]),
}
)
constructor(private router:Router){
}
passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
  if (this.registerform) {
    return control.value === this.registerform.get('password')?.value ? null : { passwordMismatch: true };
  }
  return null;
}
register(){
  alert('Registrado'),
  this.router.navigate(['login']);
}
}
