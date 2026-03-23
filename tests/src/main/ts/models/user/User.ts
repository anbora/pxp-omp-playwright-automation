import { SerializedName } from "common/testing/json";

export class User {

    private email: string;
    private termsAccepted: boolean;
    private _password: string;

    public getEmail(): string {

      return email;
    }

    public setEmail(email: string): void {

      this.email = email;

    }

    public getTermsAccepted(): boolean {

      return termsAccepted;
    }

    public setTermsAccepted(termsAccepted: boolean): void {

      this.termsAccepted = termsAccepted;

    }

    public get_password(): string {

      return _password;
    }

    public set_password(_password: string): void {

      this._password = _password;

    }

}
