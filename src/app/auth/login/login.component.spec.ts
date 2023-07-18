import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from 'src/app/services/errors.service';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let firebase: FirebaseService;
  let router: Router;
  let error: HttpErrorResponse;
  let handleError: ErrorsService;
  let guard: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        ButtonModule,
        MessagesModule,
        PasswordModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    firebase = TestBed.inject(FirebaseService);
    handleError = TestBed.inject(ErrorsService);
    router = TestBed.inject(Router);
    guard = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //! fix
/*   it('change the property isLogged to true and navigate inside the app', () => {
    spyOn(firebase, 'loginUser');

    spyOn(firebase, 'createUserStorage').and.callFake(()=> {

    })
    component.onSubmitLogin(component.loginForm);
    expect(guard.isLogged).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith(['../users']);
  }); */

  it('handle errors to getUsers method', () => {
    error = new HttpErrorResponse({});
    spyOn(firebase, 'loginUser').and.returnValue(throwError(() => error));
    component.onSubmitLogin(component.loginForm);
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });
});
