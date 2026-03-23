import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { ShareContentModalAssertions } from "assertions/careergrowth/jobs/ShareContentModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SimilarJobsCarouselTest extends BaseRestTest {

    private three: string = "3";
    private excellentMatchColor: string = "rgb(109, 196, 151)";
    private goodMatchColor: string = "rgb(145, 200, 62)";
    private fairMatchColor: string = "rgb(251, 171, 25)";
    private lowMatchColor: string = "rgb(238, 124, 43)";
    private guineaPigStylist: string = "Guinea Pig Stylist";
    private miceStylist: string = "Mice Stylist";
    private marmotStylist: string = "Marmot Stylist";
    private chipmunkStylist: string = "Chipmunk Stylist";
    private rodentsStylistsShortName: string = "Rodents stylists";
    private rodentsStylistsFullName: string = "Rodents stylists -  Rodents stylists";
    private internship: string = "Internship";
    private excellentMatch: string = "Excellent match";
    private goodMatch: string = "Good match";
    private fairMatch: string = "Fair match";
    //private String seattleWashingtonUSA = "Seattle, Washington, USA";
    private customerService: string = "customer service";
    private permanent: string = "Permanent";
    private shareModalHeader: string = "Share Job Vacancy";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckJobVacancyDetailsOnSimilarJobsCarousel(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToEditProfileFromUserDropDown(this.user.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.rodentsStylistsShortName, this.rodentsStylistsFullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.marmotStylist)
                .goToFirstJobVacancyOnAllJobsList()
                .clickAddSkillsToPassport()
                .markAllSkill()
                .clickSave()
                .clickBackButton()
                .typeSearchValue(this.guineaPigStylist)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForExcellentMatchingForLinkedJobVacancy()
                .check(JobVacancyDetailsAssertions)
                    .assertThatCarouselCounterIsEqualTo(this.three)
                    .assertThatTheNumberOfTheJobsOnCarouselIsEqualTo(this.three)
                    .assertThatThereIsJobTitleOnCarousel(this.marmotStylist)
                    .assertThatMatchForGivenJobOnCarouselIsEqualTo(this.marmotStylist, this.excellentMatch)
                    .assertThatMatchIconForGivenJobOnCarouselIsEqualTo(this.marmotStylist, this.excellentMatchColor)
                    .assertThatThereIsJobTitleOnCarousel(this.chipmunkStylist)
                    .assertThatMatchForGivenJobOnCarouselIsEqualTo(this.chipmunkStylist, this.goodMatch)
                    .assertThatMatchIconForGivenJobOnCarouselIsEqualTo(this.chipmunkStylist, this.goodMatchColor)
                    //.assertThatLocationForGivenJobOnCarouselIsEqualTo(chipmunkStylist, seattleWashingtonUSA)
                    .assertThatTypeForGivenJobOnCarouselIsEqualTo(this.chipmunkStylist, this.permanent)
                    .assertThatSkillForGivenJobOnCarouselIsEqualTo(this.chipmunkStylist, this.customerService)
                    .assertThatThereIsJobTitleOnCarousel(this.miceStylist)
                    .assertThatTypeForGivenJobOnCarouselIsEqualTo(this.miceStylist, this.internship)
                    .assertThatMatchForGivenJobOnCarouselIsEqualTo(this.miceStylist, this.fairMatch)
                    .assertThatMatchIconForGivenJobOnCarouselIsEqualTo(this.miceStylist, this.fairMatchColor)
                .endAssertion()
                .goToJobVacancyOnCarousel(this.miceStylist)
                .check(JobVacancyDetailsAssertions)
                    .assertThatThereIsJobTitleOnCarousel(this.guineaPigStylist)
                .endAssertion()
                .shareSimilarJob(this.guineaPigStylist)
                .check(ShareContentModalAssertions)
                    .assertThatModalHeaderIsEqualTo(this.shareModalHeader)
                .endAssertion()
                .closeModalAndGoBackToJobVacancyDetailsPage()
                .bookmarkSimilarJob(this.guineaPigStylist)
                .dismissSimilarJob(this.marmotStylist)
                .check(JobVacancyDetailsAssertions)
                    .assertThatJobIsNotDisplayedOnCarousel(this.marmotStylist)
                    .assertThatSimilarJobIsMarkedAsBookmarked(this.guineaPigStylist)
                    .assertThatDismissSimilarJobButtonIsNotDisplayed(this.guineaPigStylist);
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
