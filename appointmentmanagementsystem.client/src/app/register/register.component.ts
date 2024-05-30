import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../user.service';
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
constructor(private router:Router, private userService:UserService){
}
passwordMatchValidator(control: FormControl): { [s: string]: boolean } | null {
  if (this.registerform) {
    return control.value === this.registerform.get('password')?.value ? null : { passwordMismatch: true };
  }
  return null;
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
