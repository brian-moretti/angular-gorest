import { Injectable } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebase: FirebaseService) {}

  isLogged: boolean = false;

  isAuth() {
    //? CONDIZIONE DI VERIFICA AUTH TOKEN?
    //if(this.firebase.user?.apiKeyGoRest == this.firebase.goRestAPI){
    return (this.isLogged = !this.isLogged);
    // } return this.isLogged
  }
}
