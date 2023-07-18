import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FirebaseService } from './firebase.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Account } from '../models/firebase.model';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let auth: AuthService;
  let router: Router;
  let controller: HttpTestingController;
  let account: Account;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();
    service = TestBed.inject(FirebaseService);
    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call correctly the signup method', () => {
    const mockResponse = { success: true };
    const name = '';
    const email = '';
    const password = '';
    const gender = '';
    service
      .signupNewUser(name, email, password, gender)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
        const mockReq = controller.expectOne(service.firebaseSignupRESTAPI);
        expect(mockReq.request.method).toBe('POST');
      });
  });

/*    it('put user info in the localStorage', () => {
    const name = '';
    const email = '';
    const id = '';
    const token = '';
    const expDate = new Date();
    const apiKeyGoRest = '';
    account = new Account(name, email, id, token, expDate, apiKeyGoRest)
    service.createUserStorage(name, email, id, token, expDate, apiKeyGoRest)
    expect(service.account).toEqual(account)
  }); */

  it('call correctly the login method', () => {
    const mockResponse = { success: true };
    const name = '';
    const email = '';
    const password = '';
    service.loginUser(name, email, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const mockReq = controller.expectOne(service.firebaseLoginRESTAPI);
    expect(mockReq.request.method).toEqual('POST');
  });

  it('should navigate to auth throught the logout method', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');
    service.logoutUser();
    expect(auth.isLogged).toBeFalsy();
    expect(service.account).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledOnceWith(['auth']);
  });
});
