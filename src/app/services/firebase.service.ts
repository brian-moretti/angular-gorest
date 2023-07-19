import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/firebase.model';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs';
import { ErrorsService } from './errors.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private http: HttpClient,
    private guard: AuthService,
    private handleError: ErrorsService,
    private router: Router
  ) {}

  APIKeyFirebase = environment.APIKeyFirebase; //'AIzaSyBqezR5xu8V631clNX5xjEbhL3PhZePUYY';
  firebaseSignupRESTAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKeyFirebase}`;
  firebaseLoginRESTAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKeyFirebase}`;

  signupNewUser(user: string, email: string, password: string, gender: string) {
    return this.http
      .post(this.firebaseSignupRESTAPI, {
        user: user,
        email: email,
        password: password,
        gender: gender,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  account!: Account | null;

  createUserStorage(
    name: string,
    email: string,
    id: string,
    token: string,
    expDate: Date,
    apiKeyGoRest: string,
  ) {
    this.account = new Account(
      name,
      email,
      id,
      token,
      expDate,
      apiKeyGoRest,
    );
    localStorage.setItem('Account', JSON.stringify(this.account));
  }

  loginUser(email: string, password: string, user?: string) {
    return this.http
      .post(this.firebaseLoginRESTAPI, {
        email: email,
        password: password,
        user: user,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  logoutUser() {
    this.guard.isLogged = false;
    this.account = null;
    localStorage.removeItem('Account');
    this.router.navigate(['auth']);
  }
}
