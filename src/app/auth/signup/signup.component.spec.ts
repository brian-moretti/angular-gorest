import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, NgForm } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { PasswordModule } from 'primeng/password';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Account } from 'src/app/models/firebase.model';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let form: NgForm;
  let firebase: FirebaseService;
  let account: Account;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        HttpClientTestingModule,
        ButtonModule,
        MessagesModule,
        FormsModule,
        FieldsetModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        PasswordModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    firebase = TestBed.inject(FirebaseService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on field change', () => {
    component.onFieldChange();
    expect(component.showError).toBeTruthy();
  });
});
