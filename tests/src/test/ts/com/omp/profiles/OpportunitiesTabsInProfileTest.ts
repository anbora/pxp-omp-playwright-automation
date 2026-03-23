import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { ManageRoleAssertions } from "assertions/careergrowth/roles/ManageRoleAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class OpportunitiesTabsInProfileTest extends BaseRestTest {

    private first: string = "1";
    private second: string = "2";
    private alphabeticalAZ: string = "Alphabetical: Z-A";
    private highlightedColor: string = "rgb(56, 182, 160)";
    private markAsAspitrationalRole: string = "Mark as aspirational Job Role";
    private markedAsAspitrationalRole: string = "Marked as aspirational Job Role";
    private removeAsAspitrationalRole: string = "Remove as aspirational Job Role";
    private applications: string = "Applications";
    private bookmarked: string = "Bookmarked";
    private dismissed: string = "Dismissed";
    private openJobVacanciesUrl: string = "/career/job-vacancies";
    private rolesUrl: string = "/career/job-roles";
    private noBookmarkedJobs: string = "You haven`t this.bookmarked any Open Jobs yet. Start by exploring open Open Jobs!";
    private noAspirationalRoles: string = "You haven`t marked any Job Roles as aspirational Job Role yet. Start by exploring available Job Roles!";
    private roleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldVerifyRolesProfileTab(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .sortListBy(this.alphabeticalAZ)
                .getFirstItemOnSuggestedJobVacanciesList(this.roleContainer)
                .performActionForRoleNumber(this.first, this.markAsAspitrationalRole)
                .goToProfileFromUserDropDown(this.user.name)
                .clickRolesTab()
                .refreshPageUntilRoleFound(this.roleContainer.getValue())
                .check(ManageRoleAssertions)
                    .assertThatSubmenuTabIsSelected(this.markedAsAspitrationalRole)
                    .assertThatSubmenuTabIsHighlighted(this.markedAsAspitrationalRole, this.highlightedColor)
                .endAssertion()
                .performActionForRole(this.removeAsAspitrationalRole)
                .check(ManageRoleAssertions)
                    .assertThatThereIsNoItemsToShow(this.noAspirationalRoles);
    }

    public shouldVerifyJobVacanciesProfileTab(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .sortListBy(this.alphabeticalAZ)
                .clickSpecifiedVacancyByOrder(this.first)
                .clickBookmarkButton()
                .clickBackButton()
                .clickSpecifiedVacancyByOrder(this.second)
                .clickDismissButton()
                .clickBackButton()
                .goToProfileFromUserDropDown(this.user.name)
                .clickOpenJobsTab()
                .check(MyOpportunitiesAssertions)
                    .assertThatSubmenuTabIsSelected(this.applications)
                    .assertThatSubmenuTabIsHighlighted(this.applications, this.highlightedColor)
                .endAssertion()
                .selectLeftMenuTab(this.bookmarked)
                .check(MyOpportunitiesAssertions)
                    .assertThatSubmenuTabIsSelected(this.bookmarked)
                    .assertThatSubmenuTabIsHighlighted(this.bookmarked, this.highlightedColor)
                .endAssertion()
                .clickUnbookmarkJobVacancy()
                .check(MyOpportunitiesAssertions)
                    .assertThatThereIsNoItemsToShow(this.noBookmarkedJobs)
                .endAssertion()
                .selectLeftMenuTab(this.dismissed)
                .check(MyOpportunitiesAssertions)
                    .assertThatSubmenuTabIsSelected(this.dismissed)
                    .assertThatSubmenuTabIsHighlighted(this.dismissed, this.highlightedColor)
                .endAssertion()
                .selectLeftMenuTab(this.bookmarked)
                .clickExploreOpenJobs()
                .check(VacanciesListAssertions)
                    .assertThatUrlContainsProperText(this.openJobVacanciesUrl);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
