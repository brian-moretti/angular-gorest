import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Profile,
  Account,
  UsersGoRest,
  UsersPosts,
} from '../models/usersgoRest';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  //firebaseUrl: string = 'https://s2i-nttdata-default-rtdb.europe-west1.firebasedatabase.app/';

  /* newUser(body: {}) {
    return this.http.post(`${this.firebaseUrl}users.json`, body);
  }

  getUser() {
    return this.http.get(this.firebaseUrl);
  } */

  //! Firebase

  APIKeyFirebase = 'AIzaSyBqezR5xu8V631clNX5xjEbhL3PhZePUYY';
  firebaseSignupRESTAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKeyFirebase}`;
  firebaseLoginRESTAPI = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKeyFirebase}`;

  signupNewUser(user: string, email: string, password: string, gender: string) {
    return this.http.post(this.firebaseSignupRESTAPI, {
      user: user,
      email: email,
      password: password,
      gender: gender,
      returnSecureToken: true,
    });
  }

  account: Account | undefined; // TODO FIX

  createUserStorage(
    email: string,
    id: string,
    token: string,
    expDate: Date,
    apiKeyGoRest: string,
  ) {
    this.account = new Account(email, id, token, expDate, apiKeyGoRest);
    //? Da inserire proprietà per APIKEY GOREST
  }

  loginUser(user: string, email: string, password: string) {
    return this.http.post(this.firebaseLoginRESTAPI, {
      user: user,
      email: email,
      password: password,
      returnSecureToken: true,
    });
    //! Impostare catchError password/email
    //! Logged = true
  }

  logoutUser() {
    //! Logged = false
    this.account = undefined; // TODO FIX
    localStorage.removeItem('user');
  }
}
