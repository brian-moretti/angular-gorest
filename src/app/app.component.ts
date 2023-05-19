import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      const currentUser = "";
      /*this.firebase.createUser(
        currentUser.email,
        currentUser.id,
        currentUser._token,
        currentUser._expDate
      );*/
    }
  }
}
