import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  Users: User[] = [];
  Admins: User[] = [];
  constructor(private userService:UserService){}

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe((users:User[]) => {
      
      users.sort((a,b) => {
        if(a.id_user && b.id_user){
       if(a.id_user < b.id_user) return -1;
       else return 1;
        }
        else return 0;
      });
      
      users.map(user => {
        if(user.is_admin){
          this.Admins.push(user);
        }
        else{
          this.Users.push(user);
        }
      })


    }) 
  }


}
