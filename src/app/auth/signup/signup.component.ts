import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Account } from 'src/app/models/firebase.model';
import { ErrorsService } from 'src/app/services/errors.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private handleError: ErrorsService
  ) {}

  value = '';
  userSignup!: Account;
  showError: boolean = false;
  errorMessage: string = '';
  message!: Message[];

  onSubmitSignup(form: NgForm) {
    const userName = form.value.user;
    const email = form.value.email;
    const gender = form.value.gender;
    const password = form.value.password;
    this.errorMessage = '';

    this.firebase.signupNewUser(userName, email, password, gender).subscribe({
      next: (data: any) => {
        this.userSignup = data;
        this.router.navigate(['auth/login']);
        form.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleSignupErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
  }

  onFieldChange() {
    this.showError = true;
  }
}
