import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { GorestService } from './services/gorest.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private firebase: FirebaseService) {}

  messages!: Message[];

  ngOnInit(): void {
    this.checkSession();
  }

  checkSession(): void {
    let now = new Date();
    let expDateSession: Date = new Date(
      JSON.parse(localStorage.getItem('Account')!)._expDate
    );
    setTimeout(() => {
      console.log(now > expDateSession);
      if (now > expDateSession) {
        this.messages = [
          {
            severity: 'warn',
            summary: 'Warning',
            detail: 'Your session has expired. Please log again',
          },
        ];
        this.firebase.logoutUser();
      } else {
        console.log(now, expDateSession);
      }
      this.checkSession();
    }, 1000);
  }
}
