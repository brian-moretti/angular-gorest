import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private gorest: GorestService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmitLogin(form: FormGroup) {
    const userName = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    console.log(form, form.value);
    this.firebase
      .loginUser(userName, email, password)
      .subscribe((data: any) => {
        console.log(data);
        const expDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        this.firebase.createUserStorage(
          data.email,
          data.localId,
          data.idToken,
          expDate,
          this.gorest.gorestAPI
        );
        // TODO -> TOKEN di GOFOREST API per l'accesso alla dashboard
        localStorage.setItem('user', JSON.stringify(this.gorest.profile));
        console.log(this.gorest.profile);
        this.router.navigate(['/dashboard']);
      });
  }

  goHome() {
    //? TEST LOCAL STORAGE PROPERTY
    localStorage.setItem('apiKey', this.gorest.gorestAPI);
    console.log(localStorage.getItem('apiKey'));
  }
}
