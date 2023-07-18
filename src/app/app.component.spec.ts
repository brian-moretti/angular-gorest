import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from './auth/auth.service';
import { FirebaseService } from './services/firebase.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let auth: AuthService;
  let firebase: FirebaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MessagesModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    firebase = TestBed.inject(FirebaseService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkSession on OnInit', () => {
    spyOn(component, 'checkSession');
    component.ngOnInit();
    expect(component.checkSession).toHaveBeenCalled();
  });

  it('should set isLogged to true', () => {
    const sessionExpired = {
      _expDate: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(sessionExpired)
    );
    component.checkSession();
    expect(auth.isLogged).toBeTruthy();
  });

  it('should call logoutUser() method if session expired', () => {
    const sessionExpired = {
      _expDate: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(sessionExpired)
    );
    spyOn(firebase, 'logoutUser');

    component.checkSession();
    expect(auth.isLogged).toBeFalsy();
    expect(firebase.logoutUser).toHaveBeenCalled();
  });
});
