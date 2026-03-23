import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LearningRecommendationsAssertions } from "skillstudio/assertions/LearningRecommendationsAssertions";
import { SkillUpdateFromTemplateAssertions } from "skillstudio/assertions/SkillUpdateFromTemplateAssertions";
import { LearningRecommendationsPage, OrganizationOperationPage, SkillsLibraryPage, SkillUploadFromTemplatePage } from "skillstudio/pages";

export class ValidateLearningRecommendationsTest extends BaseTest{

    rand: Random = new Random();
    filePath: string = "src/main/resources/fixtures/csv/skills/singleskillimport.xlsx";
    skill_import_nav_path: string[] = ["Add skills", "Upload from template"];
    static search_skills_nav_path: string[] = ["Libraries", "Skills"];
    skill_name: string;

    public VerifyLearningRecommendationPageForCustomSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
      let skill_name: any = "AutomationSkill" + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[this.skill_name, "30", "New York", external_id]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .uploadSkillsWithTemplate(source_name, true,"success")
                .check(SkillUpdateFromTemplateAssertions)
                .assertThatSourceFileNameIsPresentInRecentUploadsSuccessfully(source_name, "success")
                .endAssertion()
                .navigateHumbergenMenu(ValidateLearningRecommendationsTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(this.skill_name)
                .clickOnSkillLabel(this.skill_name)
                .navigateToLearningRecommendations(LearningRecommendationsPage)
                .check(LearningRecommendationsAssertions)
                .assertEmptyTrainingSamplePage()
                .endAssertion()
                .toggleBetweenTrainignAndResultSamples("Result samples")
                .check(LearningRecommendationsAssertions)
                .assertResultSamplePage(true)
                .endAssertion()
                .toggleBetweenTrainignAndResultSamples("Training samples")
                .check(LearningRecommendationsAssertions)
                .assertEmptyTrainingSamplePage()
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public VerifyTrainigSamplesAddedForCustomSkill(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(ValidateLearningRecommendationsTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(this.skill_name)
                .clickOnSkillLabel(this.skill_name)
                .navigateToLearningRecommendations(LearningRecommendationsPage)
                .check(LearningRecommendationsAssertions)
                .assertEmptyTrainingSamplePage()
                .endAssertion()
                .goToAddLearningContentPage()
                .check(LearningRecommendationsAssertions)
                .assertLearningContentPage("Article","Course","Video","Query","Insert query","Since(days)","90 days by default","Object IDs","XXX-123, XXX-789","Search")
                .endAssertion()
                .searchForContent("Java")
                .check(LearningRecommendationsAssertions)
                .assertLearningContentRecommendations()
                .endAssertion()
                .addLearningContent(4)
                .check(LearningRecommendationsAssertions)
                .assertLearningContentAddedSuccessfully(4,"Learning Objects are added in skill training samples.")
                .assertCardsOnLearningRecommendationPage()
                .endAssertion()
                .cardDetailPage()
                .check(LearningRecommendationsAssertions)
                .assertCardsDetailPage("Java")
                .endAssertion()
                .closeCardDetailPage()
                .deleteCardFromTrainingPage()
                .check(LearningRecommendationsAssertions)
                .assertLearningContentAddedSuccessfully(3,"Learning Object is removed from the skill training samples.")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public VerifyLearningRecommendationPageForSkillLinkedToSGSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[this.skill_name, "30", "New York", external_id]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .uploadSkillsWithTemplate(source_name, true,"success")
                .check(SkillUpdateFromTemplateAssertions)
                .assertThatSourceFileNameIsPresentInRecentUploadsSuccessfully(source_name, "success")
                .endAssertion()
                .navigateHumbergenMenu(ValidateLearningRecommendationsTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(this.skill_name)
                .clickOnSkillLabel(this.skill_name)
                .navigateToLearningRecommendations(LearningRecommendationsPage)
                .check(LearningRecommendationsAssertions)
                .assertResultSamplePage(false)
                .endAssertion()
                .cardDetailPage()
                .check(LearningRecommendationsAssertions)
                .assertCardsDetailPage("Automation")
                .endAssertion()
                .cancelCardDetailPage()
                .logoutSkillsStudio(OrganizationOperationPage);
    }
}
