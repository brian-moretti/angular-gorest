import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private firebase: FirebaseService, private router: Router) {}

  onSubmitSignup(form: NgForm) {
    const userName = form.value.user;
    const email = form.value.email;
    const gender = form.value.gender;
    const password = form.value.password;
    console.log(form.value);
    this.firebase
      .signupNewUser(userName, email, password, gender)
      .subscribe((data) => console.log(data));
    this.router.navigate(['/login']);
    form.reset();
  }
}
