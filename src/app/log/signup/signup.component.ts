import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/usersgoRest';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private firebase: FirebaseService, private router: Router) {}

  value = '';
  userSignup!: Account

  onSubmitSignup(form: NgForm) {
    const userName = form.value.user;
    const email = form.value.email;
    const gender = form.value.gender;
    const password = form.value.password;
    console.log(form.value);
    this.firebase
      .signupNewUser(userName, email, password, gender)
      .subscribe((data) => {console.log(data)
      //this.userSignup = data //!classe no interface
      });
      //? RITORNA OGGETTO CON DATI DI ACCESSO FIREBASE
    this.router.navigate(['/login']);
    form.reset();
  }
}

//! Creazione UTENTE ACCOUNT per mostrare dati a schermo + utilizzo per commenti
