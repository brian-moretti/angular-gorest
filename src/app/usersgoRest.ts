export interface UsersGoRest {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
/*
export type User = {
  name: string,
  email: string,
  status?: string
}
 */
//? INSERIRE PROPRIETA' APIKEY GOREST IN NUOVO UTENTE CREATO

export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expDate: Date,
    public apiKeyGoRest: string
  ) {}

  get token() {
    if (!this._expDate || new Date() > this._expDate) {
      return null;
    }
    return this._token;
  }
}

export class Profile {
  user: string;
  email: string;
  gender: string;
  status: string;
  constructor(user: string, email: string, gender: string, status: string) {
    this.user = user;
    this.email = email;
    this.gender = gender;
    this.status = status;
  }
}
