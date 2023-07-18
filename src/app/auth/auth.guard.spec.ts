import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    guard = TestBed.inject(AuthGuard);
    auth = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call isAuth', () => {
    spyOn(auth, 'isAuth');
    guard.canActivate()
    expect(auth.isAuth).toHaveBeenCalled()
  });
});
