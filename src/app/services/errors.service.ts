import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  handleHttpErrors(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => error);
  }

  handleSignupErrors(error: HttpErrorResponse): string {
    console.error(error);
    if (
      error.status === 400 &&
      error.error?.error?.message === 'INVALID_EMAIL'
    ) {
      return 'The email is not valid. Please try again';
    } else {
      return 'Something went wrong. Please reload and try again';
    }
  }

  handleLoginErrors(error: HttpErrorResponse): string {
    console.error(error);
    if (
      error.status === 400 &&
      error.error?.error?.message === 'EMAIL_NOT_FOUND'
    ) {
      return "The email is wrong, it's not founded in our database. Please try again";
    } else if (
      error.status === 400 &&
      error.error?.error?.message === 'INVALID_PASSWORD'
    ) {
      return 'The password is wrong. Please try again';
    } else {
      return 'Something went wrong. Please reload and try again';
    }
  }

  goRestAPIErrors(error: HttpErrorResponse): string {
    console.error(error);
    switch (error.status) {
      case 400:
        return 'A bad request has been mada providing wrong data when requested';
      case 401:
        return 'Authentication failed. Please contact the master';
      case 404:
        return 'Unfortunately the requested resource does not exist anymore';
      case 422:
        return `There was an input error. You provided the wrong information on the following field: ${error.error[0]?.field} ${error.error[0]?.message}`;
      case 429:
        return 'You are required too many information from the server';
      case 500:
        return 'An internal server error occured. Please try again';
      default:
        return 'An error occurred. Please reload the page and try again';
    }
  }

  handleGoRestErrors(error: HttpErrorResponse): string {
    return this.goRestAPIErrors(error);
  }
}
