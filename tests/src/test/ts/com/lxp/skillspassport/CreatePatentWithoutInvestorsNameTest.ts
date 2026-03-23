import { PatentModalPageAssertion } from "assertions/skillspassport/PatentModalPageAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreatePatentWithoutInvestorsNameTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly PATENT_NAME: string = "EN Patent" + CreatePatentWithoutInvestorsNameTest.RANDOM_SUFFIX;
    private static readonly DESCRIPTION: string = "nPreviously, customers regularly created, updated, and deleted content on the platform. However, any content that needed to be removed after a certain number of days had to be removed manually. Content authors were unable to specify the number of days after which the content would be automatically archived from the platform. With the latest update, content authors and Administrators can specify a particular date for automatic archiving. This feature is optional and applies exclusively to this.user c";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public addPatentWithoutInvestorsName(): void {
        this.getOmpLoginPage()
                .run((new LoginWithOnboardingScenario(this.user)))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickSkillsPassportAddSkillButton()
                .selectPatentType()
                .addPatentTitle(CreatePatentWithoutInvestorsNameTest.PATENT_NAME)
                .addDescriptionFromInput(CreatePatentWithoutInvestorsNameTest.DESCRIPTION)
                .clickSaveButton()
                .check(PatentModalPageAssertion)
                    .assertThatPatentIsAdded(CreatePatentWithoutInvestorsNameTest.PATENT_NAME)
                    .assertThatPatentInvestorNameEmpty();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
