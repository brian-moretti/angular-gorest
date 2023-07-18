export class Account {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private _token: string,
    public _expDate: Date,
    public apiKeyGoRest: string,
  ) {}

  get token() {
    if (!this._expDate || new Date() > this._expDate) {
      return null;
    }
    return this._token;
  }
}
