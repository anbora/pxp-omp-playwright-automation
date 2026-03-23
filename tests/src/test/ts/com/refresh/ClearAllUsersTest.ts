import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";

export class ClearAllUsersTest extends BaseRestTest {

    public shouldDeleteAllUsers(): void {

      deleteAllUsers();

    }
}
