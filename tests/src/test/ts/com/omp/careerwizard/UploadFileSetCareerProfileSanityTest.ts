import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { UploadResumeFileModalAssertions } from "assertions/careergrowth/project/UploadResumeFileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class UploadFileSetCareerProfileSanityTest extends BaseRestTest {

    private christopherDocumentName: string = "Christopher_Morgan_cv.pdf";
	private filePath: string = "src/main/resources/fixtures/";
	private workHistoryPosition: string = "Web Developer";
    private timDocumentName: string = "TimCV5.doc";
    private jobTitleAdded: string = "QA Developer";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldUploadedFileAndVerifyTheDocumentTitle(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSelectFile()
                .uploadFile(this.filePath, this.christopherDocumentName)
                .check(UploadResumeFileModalAssertions)
                    .assertThatDocumentNameIsEqualTo(this.christopherDocumentName)
                .endAssertion()
                .clickUploadButton()
                .clickNextButton()
                .clickAddButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryPosition);
    }

    public shouldUploadFileAndVerifyTheJobTitleValidation(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSelectFile()
                .uploadFile(this.filePath, this.timDocumentName)
                .check(UploadResumeFileModalAssertions)
                    .assertThatDocumentNameIsEqualTo(this.timDocumentName)
                .endAssertion()
                .clickUploadButton()
                .check(UploadResumeFileModalAssertions)
                    .assertThatDocumentNameIsEqualTo(this.timDocumentName)
                    .assertThatTitleErrorIsVisible()
                .endAssertion()
                .editJobTitle(this.jobTitleAdded)
                .check(UploadResumeFileModalAssertions)
                    .assertThatTitleErrorIsNotVisible()
                .endAssertion()
                .clickNextButton()
                .clickAddButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.jobTitleAdded);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
