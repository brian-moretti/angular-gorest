import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private firebase: FirebaseService, private router: Router){}

  logout(){
    this.firebase.logoutUser()
    this.router.navigate(['/home'])
  }
}
