import { NewProfileFollowingModalPageAssertions } from "assertions/newprofile/NewProfileFollowingModalPageAssertions";
import { NewProfilePageAssertions } from "assertions/newprofile/NewProfilePageAssertions";
import { SmartSearchPageAssertions } from "assertions/other/SmartSearchPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class VisibilityOfFollowersAndFollowingInNewProfileTest extends BaseRestTest {

    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(true);
    }

    public shouldDisplayFollowingCounterAndList(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .check(NewProfilePageAssertions)
                    .assertThatFollowersButtonIsDisplayed()
                .endAssertion()
                .useKeywordSearch(this.getCypress2User().name)
                .visitPeopleTab()
                .clickFollowButton()
                .check(SmartSearchPageAssertions)
                    .assertThatUnfollowButtonIsDisplayed()
                .endAssertion()
                .goDirectlyTo(NewProfilePage)
                .check(NewProfilePageAssertions)
                    .assertThatFollowingButtonIsDisplayed()
                    .assertThatFollowingButtonContainsFollowingCounter()
                .endAssertion()
                .clickFollowingButton()
                .check(NewProfileFollowingModalPageAssertions)
                    .assertThatFollowingNameIsDisplayed(this.getCypress2User().name)
                .endAssertion();
    }

        public shouldDisplayFollowersCounterAndList(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .useKeywordSearch(this.user.name)
                .visitPeopleTab()
                .clickFollowButton()
                .check(SmartSearchPageAssertions)
                    .assertThatUnfollowButtonIsDisplayed()
                .endAssertion()
                .goDirectlyTo(NewProfilePage)
                .check(NewProfilePageAssertions)
                    .assertThatFollowersButtonContainsCounter()
                    .assertThatFollowersButtonContainsCounter()
                .endAssertion()
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(NewProfilePage)
                .clickFollowersButton()
                .check(NewProfileFollowingModalPageAssertions)
                    .assertThatFollowerNameIsDisplayed(this.user2.name)
                .endAssertion();
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
