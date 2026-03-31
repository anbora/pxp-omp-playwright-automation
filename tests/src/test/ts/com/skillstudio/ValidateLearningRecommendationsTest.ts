// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LearningRecommendationsPage, OrganizationOperationPage, SkillsLibraryPage, SkillUploadFromTemplatePage } from "skillstudio/pages";
import { expect } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page1 = __page1.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page1 = __page1.launchSkillStudio();
        __page1 = __page1.getPageClass(SkillUploadFromTemplatePage);
        __page1 = __page1.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page1 = __page1.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page1 = __page1.uploadSkillsWithTemplate(source_name, true, "success");
        expect(__page1.Verify_Recent_Uploaded_Skill_Import_Loc(source_name, "success")).toBeVisible({ timeout: 30000 });
        __page1 = __page1.navigateHumbergenMenu(ValidateLearningRecommendationsTest.search_skills_nav_path, SkillsLibraryPage);
        __page1 = __page1.skillSearch(this.skill_name);
        __page1 = __page1.clickOnSkillLabel(this.skill_name);
        __page1 = __page1.navigateToLearningRecommendations(LearningRecommendationsPage);
        expect(__page1.Learning_Content_Language_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Toggle_Button_For_Custom_Skill_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Empty_Training_Sample_Page_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Add_Content_Link_Loc).toBeVisible({ timeout: 30000 });
        __page1 = __page1.toggleBetweenTrainignAndResultSamples("Result samples");
        expect(__page1.Learning_Content_Language_Loc).toBeVisible({ timeout: 30000 });
        if (true)
                    {
                        expect(__page1.Toggle_Button_For_Custom_Skill_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page1.Empty_Result_Sample_Page_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page1.Rerun_Recommendations_Link_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page1.Rerun_Recommendations_Button_Loc).toBeVisible({ timeout: 30000 });
                    }
                    else
                    {
                        expect(__page1.Toggle_Button_For_Custom_Skill_Loc).not.toBeVisible();
                        expect(__page1.Empty_Result_Sample_Page_Loc).not.toBeVisible();
                        expect(__page1.Result_Sample_Button_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page1.Rerun_Recommendations_Link_Loc).not.toBeVisible();
                        expect(__page1.Rerun_Recommendations_Button_Loc).not.toBeVisible();
                    }
        __page1 = __page1.toggleBetweenTrainignAndResultSamples("Training samples");
        expect(__page1.Learning_Content_Language_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Toggle_Button_For_Custom_Skill_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Empty_Training_Sample_Page_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Add_Content_Link_Loc).toBeVisible({ timeout: 30000 });
        __page1 = __page1.logoutSkillsStudio(OrganizationOperationPage);
    }

    public VerifyTrainigSamplesAddedForCustomSkill(): void {
                let __page2: any = this;
        __page2 = __page2.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page2 = __page2.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page2 = __page2.launchSkillStudio();
        __page2 = __page2.getPageClass(SkillUploadFromTemplatePage);
        __page2 = __page2.navigateHumbergenMenu(ValidateLearningRecommendationsTest.search_skills_nav_path, SkillsLibraryPage);
        __page2 = __page2.skillSearch(this.skill_name);
        __page2 = __page2.clickOnSkillLabel(this.skill_name);
        __page2 = __page2.navigateToLearningRecommendations(LearningRecommendationsPage);
        expect(__page2.Learning_Content_Language_Loc).toBeVisible({ timeout: 30000 });
        expect(__page2.Toggle_Button_For_Custom_Skill_Loc).toBeVisible({ timeout: 30000 });
        expect(__page2.Empty_Training_Sample_Page_Loc).toBeVisible({ timeout: 30000 });
        expect(__page2.Add_Content_Link_Loc).toBeVisible({ timeout: 30000 });
        __page2 = __page2.goToAddLearningContentPage();
        expect(__page2.Content_Type_loc("Article")).toBeVisible({ timeout: 30000 });
        expect(__page2.Content_Type_loc("Course")).toBeVisible({ timeout: 30000 });
        expect(__page2.Content_Type_loc("Video")).toBeVisible({ timeout: 30000 });
        expect(__page2.Input_Field_loc("Query","Insert query")).toBeVisible({ timeout: 30000 });
        expect(__page2.Input_Field_loc("Since(days)","90 days by default")).toBeVisible({ timeout: 30000 });
        expect(__page2.Input_Field_loc("Object IDs","XXX-123, XXX-789")).toBeVisible({ timeout: 30000 });
        expect(__page2.Search_Or_Cancel_Button_loc("Search")).toBeVisible({ timeout: 30000 });
        __page2 = __page2.searchForContent("Java");
        expect(__page2.Learning_Content_Recommendations_Loc).toBeVisible({ timeout: 30000 });
        __page2 = __page2.addLearningContent(4);
        expect(__page2.Alert_Message_Loc("Learning Objects are added in skill training samples.")).toBeVisible({ timeout: 30000 });
        expect(__page2.Learning_Content_On_Training_Sample_Page_Loc(4)).toBeVisible({ timeout: 30000 });
        expect(__page2.Learning_Content_Cards_Loc).toBeVisible({ timeout: 30000 });
        __page2 = __page2.cardDetailPage();
        assertTrue(text.contains("Java"));
        expect(__page2.Card_Detail_Page_Loc).toBeVisible({ timeout: 30000 });
        __page2 = __page2.closeCardDetailPage();
        __page2 = __page2.deleteCardFromTrainingPage();
        expect(__page2.Alert_Message_Loc("Learning Object is removed from the skill training samples.")).toBeVisible({ timeout: 30000 });
        expect(__page2.Learning_Content_On_Training_Sample_Page_Loc(3)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.logoutSkillsStudio(OrganizationOperationPage);
    }

    public VerifyLearningRecommendationPageForSkillLinkedToSGSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[this.skill_name, "30", "New York", external_id]];
                let __page3: any = this;
        __page3 = __page3.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page3 = __page3.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page3 = __page3.launchSkillStudio();
        __page3 = __page3.getPageClass(SkillUploadFromTemplatePage);
        __page3 = __page3.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page3 = __page3.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page3 = __page3.uploadSkillsWithTemplate(source_name, true, "success");
        expect(__page3.Verify_Recent_Uploaded_Skill_Import_Loc(source_name, "success")).toBeVisible({ timeout: 30000 });
        __page3 = __page3.navigateHumbergenMenu(ValidateLearningRecommendationsTest.search_skills_nav_path, SkillsLibraryPage);
        __page3 = __page3.skillSearch(this.skill_name);
        __page3 = __page3.clickOnSkillLabel(this.skill_name);
        __page3 = __page3.navigateToLearningRecommendations(LearningRecommendationsPage);
        expect(__page3.Learning_Content_Language_Loc).toBeVisible({ timeout: 30000 });
        if (false)
                    {
                        expect(__page3.Toggle_Button_For_Custom_Skill_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page3.Empty_Result_Sample_Page_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page3.Rerun_Recommendations_Link_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page3.Rerun_Recommendations_Button_Loc).toBeVisible({ timeout: 30000 });
                    }
                    else
                    {
                        expect(__page3.Toggle_Button_For_Custom_Skill_Loc).not.toBeVisible();
                        expect(__page3.Empty_Result_Sample_Page_Loc).not.toBeVisible();
                        expect(__page3.Result_Sample_Button_Loc).toBeVisible({ timeout: 30000 });
                        expect(__page3.Rerun_Recommendations_Link_Loc).not.toBeVisible();
                        expect(__page3.Rerun_Recommendations_Button_Loc).not.toBeVisible();
                    }
        __page3 = __page3.cardDetailPage();
        assertTrue(text.contains("Automation"));
        expect(__page3.Card_Detail_Page_Loc).toBeVisible({ timeout: 30000 });
        __page3 = __page3.cancelCardDetailPage();
        __page3 = __page3.logoutSkillsStudio(OrganizationOperationPage);
    }
}
