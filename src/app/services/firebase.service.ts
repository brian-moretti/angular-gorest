import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile, User } from '../usersgoRest';
import { catchError } from 'rxjs';

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
  //! GoRest API

  goRestAPI =
    '60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7';

  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer 60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a',
  };
  body = {
    user: 'name',
    email: 'email',
    gender: 'gender',
    status: 'status',
  };
  //? Check se ID lo crea in auto

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

  user: User | undefined; // TODO FIX

  createUserStorage(email: string, id: string, token: string, expDate: Date, apiKeyGoRest: string) {
    this.user = new User(email, id, token, expDate, apiKeyGoRest);
    //? Da inserire proprietà per APIKEY GOREST
  }

  profile: Profile = {user: "", email: "", gender: "", status: "" }
  createUser(user: string, email: string, gender: string, status: string) {
    this.profile = new Profile(user, email, gender, status);
    /*
    ? header = gorest -H
    ? body = name: user/email/gender/status
    ? return this.http.post(urlGorest, header, body)
    ! creazione classe con queste proprietà
    ! Api key goRest in localstorage utente creato
    */
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
    this.user = undefined; // TODO FIX
    localStorage.removeItem('user');
  }
}
