import { MePageContentTabAssertions } from "assertions/me/MePageContentTabAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class MePageContentBasicTest extends BaseRestTest {

    private readonly cardName: string = UUID.randomUUID().toString();
    private readonly cardLevel: string = "Beginner";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public createAssignAndVerifyContent(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToTextSmartCardTab()
                .fillInTitle(this.cardName)
                .selectLevel(this.cardLevel)
                .clickCreateCardButton()
                .check(MePageContentTabAssertions)
                    .assertThatCardNameInContentTabIsVisible(this.cardName)
                .endAssertion()
                .clickThreeDotsCardMenu()
                .clickAssignToMe()
                .clickAssignButton()
                .clickShareCardButton()
                .clickShareContentUser()
                .clickShareButton()
                .clickSharedByMeTab()
                .check(MePageContentTabAssertions)
                    .assertThatCardNameInContentTabIsVisible(this.cardName)
                .endAssertion()
                .clickAssignedByMeTab()
                .check(MePageContentTabAssertions)
                    .assertThatCardNameInContentTabIsVisible(this.cardName)
                .endAssertion()
                .clickSharedByMeTab()
                .clickThreeDotsCardMenu()
                .clickDeleteCard()
                .clickAreYouSureDeleteButton()
                .check(MePageContentTabAssertions)
                    .assertThatCardNameInContentTabIsNotVisible()
                .endAssertion()
                .clickDeletedTab()
                .check(MePageContentTabAssertions)
                    .assertThatCardNameInContentTabIsVisible(this.cardName)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
