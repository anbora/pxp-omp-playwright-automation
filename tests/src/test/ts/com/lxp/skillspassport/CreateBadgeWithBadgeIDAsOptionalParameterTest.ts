import { BadgeModalPageAssertions } from "assertions/skillspassport/BadgeModalPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreateBadgeWithBadgeIDAsOptionalParameterTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly BADGE_NAME: string = "New EN Badge" + CreateBadgeWithBadgeIDAsOptionalParameterTest.RANDOM_SUFFIX;
    private static readonly BADGE_LEVEL: string = "Beginner";
    private static readonly BADGE_ISSUER: string = "Issuer-"  + CreateBadgeWithBadgeIDAsOptionalParameterTest.UNIQUE_SUFFIX;
    private static readonly ID_NUMBER: string = "ID-"  + CreateBadgeWithBadgeIDAsOptionalParameterTest.UNIQUE_SUFFIX;
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public addBadgeCardWithoutBadgeID(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickSkillsPassportAddSkillButton()
                .selectBadgeType()
                .addBadgeTitle(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_NAME)
                .selectBadgeLevel(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_LEVEL)
                .selectBadgeIssuerFromInput(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_ISSUER)
                .clickSaveButton()
                .check(BadgeModalPageAssertions)
                    .assertThatBadgeIsAdded(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_NAME);
    }

    public editAddedBadgeCardWithoutBadgeID(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(AddEditBadgeModalPage,CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_NAME)
                .clickBadgeCard()
                .editBadgeCard()
                .selectBadgeIDFromInput(CreateBadgeWithBadgeIDAsOptionalParameterTest.ID_NUMBER)
                .clickSaveButton()
                .clickBadgeCard()
                .editBadgeCard()
                .check(BadgeModalPageAssertions)
                    .assertThatBadgeContainsIDNumber(CreateBadgeWithBadgeIDAsOptionalParameterTest.ID_NUMBER);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
