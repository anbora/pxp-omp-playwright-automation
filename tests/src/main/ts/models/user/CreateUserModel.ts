// @ts-nocheck
import { SerializedName } from "common/testing/json";
import { User } from "models/user/User";

export class CreateUserModel {

    private user: User;

    public getUser(): User {

      return user;
    }

    public setUser(user: User): void {

      this.user = user;

    }

}
