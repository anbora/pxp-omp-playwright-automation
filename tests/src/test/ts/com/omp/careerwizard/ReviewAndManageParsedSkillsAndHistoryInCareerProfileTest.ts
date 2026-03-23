import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { SkillsCareerProfileModalAssertions } from "assertions/careergrowth/profiles/SkillsCareerProfileModalAssertions";
import { UploadResumeFileModalAssertions } from "assertions/careergrowth/project/UploadResumeFileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { Gson, JsonReader, TypeToken } from "common/testing/json";
import { WorkHistoryItem } from "models/job/WorkHistoryItem";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest extends BaseRestTest {

    public static readonly CUSTOMER_SERVICE: string = "Customer Service";
    public static readonly GARDENING: string = "Gardening";
    public static readonly HORTICULTURE: string = "horticulture";
    public static readonly GARDENER: string = "Gardener";
    public static readonly UNSAVED_WORK_HISTORIES_AND_SKILLS: string = "There are some unsaved work histories and skills!";
    private static readonly UNSAVED_WORK_HISTORIES: string = "There are some unsaved work histories!";
    private static readonly UNSAVED_SKILLS: string = "There are some unsaved skills!";
    private documentName: string = "TomGärdenér.docx";
    private cvFilePath: string = "src/main/resources/fixtures/profile/";
    private workHistoryFilePath: string = "src/main/resources/fixtures/profile/workhistory.json";
    private jobId: string;
    private user: UserModel;
    private jsonReader: JsonReader;
    private expectedWorkHistory: Set<WorkHistoryItem>;
    private suggestedSkillContainer: ResultContainer;
    private moreSkillsContainer: ResultContainer;

    public initialize(): void {
      this.user = this.createUser();
        try {
            this.jsonReader = new JsonReader(new FileReader(this.workHistoryFilePath));
        } catch (e) {
            throw new RuntimeException(e);
        }
        let WorkHistoryItemsType: any = new TypeToken<Set<WorkHistoryItem>>().getType();
        this.expectedWorkHistory = new Gson().fromJson(this.jsonReader, WorkHistoryItemsType);
        this.suggestedSkillContainer = new ResultContainer();
        this.moreSkillsContainer = new ResultContainer();
    }

    public shouldUpdateCareerWithSkillsAndWorkHistoryParsedFromCv(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENER, ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENER)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSelectFile()
                .uploadFile(this.cvFilePath, this.documentName)
                .check(UploadResumeFileModalAssertions)
                    .assertThatDocumentNameIsEqualTo(this.documentName)
                .endAssertion()
                .clickUploadButton()
                .check(UploadResumeFileModalAssertions)
                    .assertWorkHistory(this.expectedWorkHistory)
                .endAssertion()
                .clickNextButton()
                .unselectAllSkills()
                .markParsedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING)
                .selectSkillLevel(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING, "Expert")
                .markParsedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE)
                .selectSkillLevel(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE, "Beginner")
                .clickAddButton()
                .clickXButtonAndStayInModal()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertWarningText(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.UNSAVED_WORK_HISTORIES)
                .endAssertion()
                .clickSkipForNowButton()
                .clickXButtonAndStayInModal()
                .check(SkillsCareerProfileModalAssertions)
                    .assertWarningText(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.UNSAVED_SKILLS)
                .endAssertion()
                .clickAddFirstSuggestedSkill(this.suggestedSkillContainer, "Intermediate")
                .clickMoreSkills(this.moreSkillsContainer)
                .markSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE)
                .selectLevelForSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE, "Advanced")
                .clickAdd()
                .check(SkillsCareerProfileModalAssertions)
                    .assertThatSkillIsDisplayed("Beginner", ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE.toLowerCase())
                    .assertThatSkillIsDisplayed("Intermediate", this.suggestedSkillContainer.getValue())
                    .assertThatSkillIsDisplayed("Expert", ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING.toLowerCase())
                    .assertThatSkillIsDisplayed("Advanced", ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE)
                    .assertThatRemainingNumberOfSuggestedSkillsDecreased(this.moreSkillsContainer)
                .endAssertion()
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToMePageProfile()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE.toLowerCase())
//                    .assertSkillHasGotBeginnerLevelIcon(CUSTOMER_SERVICE.toLowerCase())
                    .assertThatSkillIsAdded(this.suggestedSkillContainer.getValue().toLowerCase())
//                    .assertSkillHasGotIntermediateLevelIcon(suggestedSkillContainer.getValue().toLowerCase())
                    .assertThatSkillIsAdded(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING.toLowerCase())
//                    .assertSkillHasGotAdvancedLevelIcon(GARDENING.toLowerCase())
                    .assertThatSkillIsAdded(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE.toLowerCase());
//                    .assertSkillHasGotAdvancedLevelIcon(HORTICULTURE.toLowerCase());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
