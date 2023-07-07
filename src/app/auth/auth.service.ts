import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLogged: boolean = false;

  isAuth() {
    //    let userStorage = JSON.parse(localStorage.getItem('Account')!)
    if (this.isLogged) {
      return true;
    }
    return false;
  }
}
