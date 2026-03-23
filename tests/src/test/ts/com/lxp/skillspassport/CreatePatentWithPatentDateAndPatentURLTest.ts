import { PatentModalPageAssertion } from "assertions/skillspassport/PatentModalPageAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreatePatentWithPatentDateAndPatentURLTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly PATENT_NAME: string = "EN Patent" + CreatePatentWithPatentDateAndPatentURLTest.RANDOM_SUFFIX;
    private static readonly INVESTOR_NAME: string = "EN Investor" + CreatePatentWithPatentDateAndPatentURLTest.UNIQUE_SUFFIX;
    private static readonly URL_NAME: string = "http://" + CreatePatentWithPatentDateAndPatentURLTest.RANDOM_SUFFIX + "edcast.com";
    private user: UserModel;

    private dateContainer: ResultContainer;

    public initialize(): void {
      this.user = this.createUser();
      this.dateContainer = new ResultContainer();
    }

    public addPatentWithPatentURLAndPatentDate(): void {
        this.getOmpLoginPage()
                .run((new LoginWithOnboardingScenario(this.user)))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickSkillsPassportAddSkillButton()
                .selectPatentType()
                .addPatentTitle(CreatePatentWithPatentDateAndPatentURLTest.PATENT_NAME)
                .selectInvestorsName(CreatePatentWithPatentDateAndPatentURLTest.INVESTOR_NAME)
                .selectPatentURLFromInput(CreatePatentWithPatentDateAndPatentURLTest.URL_NAME)
                .chooseFifteenDayOfCurrentMonth(this.dateContainer)
                .clickSaveButton()
                .clickPatentCard()
                .check(PatentModalPageAssertion)
                    .assertThatPatentIsAdded(CreatePatentWithPatentDateAndPatentURLTest.PATENT_NAME)
                .endAssertion()
                .editPatentCard()
                .check(PatentModalPageAssertion)
                    .assertThatPatentContainsPatentDate(this.dateContainer.getValue())
                    .assertThatPatentContainsURLName(CreatePatentWithPatentDateAndPatentURLTest.URL_NAME);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
