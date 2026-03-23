import { BadgeModalPageAssertions } from "assertions/skillspassport/BadgeModalPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreateBadgeCardWithBadgeIDAndBadgeURLTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly BADGE_NAME: string = "EN Badge" + CreateBadgeCardWithBadgeIDAndBadgeURLTest.RANDOM_SUFFIX;
    private static readonly BADGE_LEVEL: string = "Beginner";
    private static readonly BADGE_ISSUER: string = "Issuer-"  + CreateBadgeCardWithBadgeIDAndBadgeURLTest.UNIQUE_SUFFIX;
    private static readonly ID_NUMBER: string = "ID-"  + CreateBadgeCardWithBadgeIDAndBadgeURLTest.UNIQUE_SUFFIX;
    private static readonly URL_NAME: string = "https://" + CreateBadgeCardWithBadgeIDAndBadgeURLTest.RANDOM_SUFFIX + ".edcast.com";
    private user: UserModel;
    public initialize(): void {
    this.user = this.createUser();
    }

    public addBadgeCardWithBadgeIDAndBadgeURL(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickSkillsPassportAddSkillButton()
                .selectBadgeType()
                .addBadgeTitle(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_NAME)
                .selectBadgeLevel(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_LEVEL)
                .selectBadgeIssuerFromInput(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_ISSUER)
                .selectBadgeIDFromInput(CreateBadgeCardWithBadgeIDAndBadgeURLTest.ID_NUMBER)
                .selectBadgeURLFromInput(CreateBadgeCardWithBadgeIDAndBadgeURLTest.URL_NAME)
                .clickSaveButton()
                .clickBadgeCard()
                .check(BadgeModalPageAssertions)
                    .assertThatBadgeIsAdded(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_NAME)
                .endAssertion()
                .editBadgeCard()
                .check(BadgeModalPageAssertions)
                    .assertThatBadgeContainsIDNumber(CreateBadgeCardWithBadgeIDAndBadgeURLTest.ID_NUMBER)
                    .assertThatBadgeContainsURLNumber(CreateBadgeCardWithBadgeIDAndBadgeURLTest.URL_NAME);
    }

    public deleteAddedBadgeCardWithBadgeIDAndBadgeURL(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(AddEditBadgeModalPage,CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_NAME)
                .clickBadgeCard()
                .clickDeleteButton()
                .clickConfirmButton()
                .check(BadgeModalPageAssertions)
                    .assertThatBadgeIsDeleted();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
