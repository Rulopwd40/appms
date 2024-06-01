import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/models';
import { __values } from 'tslib';
import { identifierName } from '@angular/compiler';
@Component({
  standalone:true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports:[ReactiveFormsModule,CommonModule],
})
export class RegisterComponent {
  errorMessages: { [key: string]: string } = {};
  registerform= new FormGroup({
   username: new FormControl('',[Validators.required,Validators.minLength(4)]),
   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
   name: new FormControl('', Validators.required),
   surname: new FormControl('', Validators.required),
   email: new FormControl('', [Validators.required, Validators.email]),
  }

)
constructor(private router:Router, private userService:UserService){
}
passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
  if (this.registerform) {
    return control.value === this.registerform.get('password')?.value ? null : { passwordMismatch: true };
  }
  return null;
}
//validadores
fieldValidation(fieldName: string | null | undefined, touched: boolean | null | undefined): boolean {
  const control = this.registerform.get(fieldName?.toString() || '');
  if (control?.invalid && touched) {
    switch(fieldName) {
      case 'username':
        if (control.errors?.['required']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Username is required.';
        } else if (control.errors?.['minlength']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Username must be at least 4 characters long.';
        }
        break;
      case 'password':
        if (control.errors?.['minlength']) {
          this.errorMessages[fieldName?.toString() || ''] = `${fieldName} must be at least ${control.errors?.['minlength'].requiredLength} characters long.`;
        } else {
          this.errorMessages[fieldName?.toString() || ''] = `${fieldName} is required.`;
        }
        break;
      case 'confirmPassword':
        if (control.errors?.['required']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Confirm Password is required.';
        } else if (control.errors?.['passwordMismatch']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Passwords must match.';
        }
        break;
      case 'name':
        if (control.errors?.['required']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Name is required.';
        }
        break;
      case 'surname':
        if (control.errors?.['required']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Surname is required.';
        }
        break;
      case 'email':
        if (control.errors?.['required']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Email is required.';
        } else if (control.errors?.['email']) {
          this.errorMessages[fieldName?.toString() || ''] = 'Email must be valid.';
        }
        break;
      default:
        break;
    }
    return true;
  }
  // Si no hay error, limpiar el mensaje de error para este campo
  delete this.errorMessages[fieldName?.toString() || ''];
  return false;
}


register() {
  if (this.registerform.valid) {
    const newUser: User = {
      username: this.registerform.value.username!,
      password: this.registerform.value.password!,
      email: this.registerform.value.email!,
      name: this.registerform.value.name!,
      lastname: this.registerform.value.surname!,
      is_admin: false,
    };
    //console.log('Datos del nuevo usuario:', newUser);
    this.userService.addUser(newUser).subscribe(response => {
      alert('Usuario registrado con éxito');
      console.log(response);
      this.router.navigate(['login']);
    }, error => {
      console.error('Error al registrar el usuario', error);
      alert('Error al registrar el usuario');
    });
  }
  }
  cancel(){
    this.router.navigate(['**']);
  }
}
