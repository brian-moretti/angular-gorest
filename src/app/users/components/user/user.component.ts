import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User, UsersGoRest } from 'src/app/usersgoRest';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor(private firebase: FirebaseService) {}

  /* user: User | undefined

  getUserInfo() {
    this.firebase.getUser().subscribe()
  } */ 
}
