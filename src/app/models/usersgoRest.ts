export interface UsersGoRest {
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}
//TODO - DA USARE PER LE CHIAMATE HTTP POST PERCHE' ID LO CREA IN AUTO
/*
export type User = {
  name: string,
  email: string,
  status?: string
}
 */
//? INSERIRE PROPRIETA' APIKEY GOREST IN NUOVO UTENTE CREATO

//! classe x account firebase login/signup
export class Account {
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
  id?: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  constructor(name: string, email: string, gender: string, status: string) {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.status = status;
  }
}

export interface UsersPosts {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface UsersComments {
  id?: number;
  post_id?: number; // === UsersPost.id
  name: string;
  email: string;
  body: string;
}

export interface UsersTodos {
  id: number;
  user_id?: number;
  title: string;
  due_on: Date;
  status: string;
}
