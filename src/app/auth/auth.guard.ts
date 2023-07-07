import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private auth: AuthService){}

  canActivate(): boolean{
    return this.auth.isAuth();
  }


}
