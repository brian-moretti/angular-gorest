import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from './auth/auth.service';
import { Subscription, interval } from 'rxjs';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private guard: AuthService, private firebase: FirebaseService) {}

  messages!: Message[];
  checkSessionSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.checkSession();
    this.checkSessionSub = interval(1000).subscribe(() => {
      this.checkSession(); //? Alternativa a setTimeout()
    });
  }

  checkSession() {
    const storageData = localStorage.getItem('Account');

    if (storageData) {
      const getStorage = JSON.parse(storageData);
      const expSession: Date = new Date(getStorage._expDate);
      const now: Date = new Date();

      if (now < expSession) {
        this.guard.isLogged = true;
      } else {
        this.guard.isLogged = false;
        this.messages = [
          {
            severity: 'warn',
            summary: 'Warning',
            detail: 'Your session has expired. Please log again',
          },
        ];
        this.firebase.logoutUser();
      }
    }
  }
}
