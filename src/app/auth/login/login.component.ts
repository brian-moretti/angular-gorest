import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  message!: Message[];

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private gorest: GorestService,
    private guard: AuthService,
    private handleError: ErrorsService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmitLogin(form: FormGroup) {
    const userName = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    this.errorMessage = '';
    this.firebase.loginUser(email, password, userName).subscribe({
      next: (data: any) => {
        const expDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        data.displayName = userName;
        this.firebase.createUserStorage(
          data.displayName,
          data.email,
          data.localId,
          data.idToken,
          expDate,
          this.gorest.gorestAPI,
        );
        this.guard.isLogged = true;
        this.router.navigate(['../users']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleLoginErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
  }
}
