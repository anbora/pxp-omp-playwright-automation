// @ts-nocheck
import { JobRoleMarkedAsAspirationalModalAssertions } from "assertions/careergrowth/roles/JobRoleMarkedAsAspirationalModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertEquals } from "common/testing/runtime";

export class SettingLearningGoalsAfterMarkingRoleAsAspirationalTest extends BaseRestTest {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
