import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if localStorage and isLogged are true', () => {
    service.isLogged = true
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({}))
    expect(service.isAuth()).toBeTruthy()
  });

  it('should return false and navigate to "auth" if isLogged and LocaleStorage are false ', () => {
    service.isLogged = false
    spyOn(localStorage, 'getItem').and.returnValue(null)
    spyOn(router, 'navigate')
    expect(service.isAuth()).toBeFalsy()
    expect(router.navigate).toHaveBeenCalledWith(['auth'])
  });
});
