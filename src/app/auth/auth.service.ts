import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isLogged: boolean = false;

  isAuth() {
    const storageData = JSON.parse(localStorage.getItem('Account')!);
    if (storageData && this.isLogged) {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}
