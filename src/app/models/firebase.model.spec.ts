import { Account } from './firebase.model';

describe('firebaseModel', () => {
  let account: Account;

  beforeEach(() => {
    account = new Account('', '', '', '', new Date(), '');
  });

  it('if session is expired token do not exist', () => {
    let passed = new Date().getTime() - 60 * 60 * 1000;
    account._expDate = new Date(passed);
    expect(account.token).toBeNull();
  });

  it('if session is still valid token exist', () => {
    let future = new Date().getTime() + 60 * 60 * 1000;
    account._expDate = new Date(future);
    expect(account.token).toBeDefined();
  });
});
