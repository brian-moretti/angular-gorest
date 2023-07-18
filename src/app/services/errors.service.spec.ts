import { TestBed } from '@angular/core/testing';

import { ErrorsService } from './errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ErrorsService', () => {
  let service: ErrorsService;
  let error: HttpErrorResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check email error on signup form', () => {
    error = new HttpErrorResponse({
      status: 400,
      error: { error: { message: 'INVALID_EMAIL' } },
    });
    const result = service.handleSignupErrors(error);
    expect(result).toBe('The email is not valid. Please try again');
  });

  it('check password on signup form', () => {
    error = new HttpErrorResponse({
      status: 400,
      error: {
        error: {
          message: 'WEAK_PASSWORD : Password should be at least 6 characters',
        },
      },
    });
    const result = service.handleSignupErrors(error);
    expect(result).toBe('The password should be at least 6 characters');
  });

  it('check password on login form', () => {
    error = new HttpErrorResponse({
      status: undefined,
    });
    const result = service.handleSignupErrors(error);
    expect(result).toBe('Something went wrong. Please reload and try again');
  });

  it('check email error on login form', () => {
    error = new HttpErrorResponse({
      status: 400,
      error: { error: { message: 'EMAIL_NOT_FOUND' } },
    });
    const result = service.handleLoginErrors(error);
    expect(result).toBe(
      "The email is wrong, it's not founded in our database. Please try again"
    );
  });

  it('check password on login form', () => {
    error = new HttpErrorResponse({
      status: 400,
      error: { error: { message: 'INVALID_PASSWORD' } },
    });
    const result = service.handleLoginErrors(error);
    expect(result).toBe('The password is wrong. Please try again');
  });

  it('check password on login form', () => {
    error = new HttpErrorResponse({
      status: undefined,
    });
    const result = service.handleLoginErrors(error);
    expect(result).toBe('Something went wrong. Please reload and try again');
  });

  it('check error 400', () => {
    error = new HttpErrorResponse({ status: 400 });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe(
      'A bad request has been mada providing wrong data when requested'
    );
  });

  it('check error 401', () => {
    error = new HttpErrorResponse({ status: 401 });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe('Authentication failed. Please contact the master');
  });
  it('check error 404', () => {
    error = new HttpErrorResponse({ status: 404 });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe(
      'Unfortunately the requested resource does not exist anymore'
    );
  });
  it('check error 422', () => {
    error = new HttpErrorResponse({
      status: 422,
      error: { field: '', message: '' },
    });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe(
      `There was an input error. You provided the wrong information on the following field: ${error.error[0]?.field} ${error.error[0]?.message}`
    );
  });
  it('check error 429', () => {
    error = new HttpErrorResponse({ status: 429 });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe(
      'You are required too many information from the server'
    );
  });
  it('check error 500', () => {
    error = new HttpErrorResponse({ status: 500 });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe('An internal server error occured. Please try again');
  });
  it('check error default', () => {
    error = new HttpErrorResponse({ status: undefined });
    const result = service.goRestAPIErrors(error);
    expect(result).toBe(
      'An error occurred. Please reload the page and try again'
    );
  });
});
