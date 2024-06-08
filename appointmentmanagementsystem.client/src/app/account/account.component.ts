import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { __values } from 'tslib';
import { UserService } from '../user.service';


@Component({
  standalone:true,
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  imports:[ReactiveFormsModule,CommonModule],
})

export class AccountComponent {
  errorMessages: { [key: string]: string } = {};

changePassForm= new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
   confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)]),
})

constructor(private userService:UserService){}

passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
  if (this.changePassForm) {
    return control.value === this.changePassForm.get('password')?.value ? null : { passwordMismatch: true };
  }
  return null;
}
fieldValidation(fieldName: string | null | undefined, touched: boolean | null | undefined): boolean {
  const control = this.changePassForm.get(fieldName?.toString() || '');
  if (control?.invalid && touched) {
    switch(fieldName) {
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
      }
      return true;
     
    }
    delete this.errorMessages[fieldName?.toString() || ''];
    return false;
  }
  changePassword() {
    const payload= {
      username: localStorage.getItem('User'),
      password: this.changePassForm.value.password,
    }
    this.userService.changePassword(payload).subscribe(response => {
      alert('Contraseña cambiada!'),
      console.log(response);
    },
    error=>{
      error('Error al cambiar la contraseña',error)
      alert('Error')
    })
    
  }

}