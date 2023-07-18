import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogoutComponent } from './logout.component';
import { ButtonModule } from 'primeng/button';
import { FirebaseService } from 'src/app/services/firebase.service';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let service: FirebaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [HttpClientTestingModule, ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FirebaseService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the logout method of Firebase when button is clicked', () => {
    spyOn(service, 'logoutUser');
    const button = fixture.nativeElement.querySelector('p-button');
    button.click();
    expect(service.logoutUser).toHaveBeenCalled();
  });
});
