import { R } from "com/redis/R";
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JsonObject } from "common/testing/json";
import { APIResponse } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class CheckMatchingDetailsAPITest extends BaseRestTest {

    private jobTitle: string = UUID.randomUUID().toString();
    private football: string = "football manager";
    private beginner: string = "Beginner";
    private jobRoleName: string = "this.football player star";
    private jobFamilyAndRoleName: string = "Unusual job family -  Football player star";
    private enabledOption: string = "enabled";
    private trueValue: string = "true";
    private jobId: string;
    private jobIdFromUrl: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.jobId = this.createJob(this.jobTitle);
    }

    public checkIfParticularMatchingDetailsIsEnabled(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.jobTitle)
                .goToFirstJobVacancyOnAllJobsList()
                .getJobId(this.jobIdFromUrl)
                .clickEditVacancyButton()
                .addSkillWithLevel(this.football, this.beginner)
                .addJobRole(this.jobRoleName,this.jobFamilyAndRoleName)
                .clickSaveButton()
                .clickEditVacancyButton();

        this.loginToMainUser();
        let response: APIResponse = this.postInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.MATCHING_DETAILS.getEndpoint(), this.jobIdFromUrl.getValue()), "{\"preferences\":[\"level\",\"workplace_model\",\"job_type\",\"schedule\",\"job_role_type\",\"career_goal\",\"locations\"],\"matchingScore\":2}");

        Assert.assertEquals(response.status(), 200);
        let jsonObject: JsonObject = this.getJsonBody(response).getAsJsonObject();
        Assert.assertEquals(jsonObject.get("careerPath").getAsJsonObject().get(this.enabledOption).getAsString(), this.trueValue);
        Assert.assertEquals(jsonObject.get("experience").getAsJsonObject().get(this.enabledOption).getAsString(), this.trueValue);
        Assert.assertEquals(jsonObject.get("preferences").getAsJsonObject().get(this.enabledOption).getAsString(), this.trueValue);
        Assert.assertEquals(jsonObject.get("skills").getAsJsonObject().get(this.enabledOption).getAsString(), this.trueValue);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
