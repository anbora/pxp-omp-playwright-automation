// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { OrganizationOperationPage } from "skillstudio/pages/OrganizationOperationPage";
import { SkillsLibraryPage } from "skillstudio/pages/SkillsLibraryPage";
import { SkillUploadFromTemplatePage } from "skillstudio/pages/SkillUploadFromTemplatePage";
import { expect } from "common/testing/playwright";

export class ValidateUploadSkillTemplateTest extends BaseTest{

    private readonly ORG_ID: string = "627";
    rand: Random = new Random();
    filePath: string = "src/main/resources/fixtures/csv/skills/singleskillimport.xlsx";
    skill_import_nav_path: string[] = ["Add skills", "Upload from template"];
    static search_skills_nav_path: string[] = ["Libraries", "Skills"];
    private static readonly CHARACTERS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static readonly RANDOM: SecureRandom = new SecureRandom();
    public static generateRandomString(length: number): string {
        let sb: any = new StringBuilder(length);
        for (let i = 0; i < length; i++) {
            let randomIndex: number = ValidateUploadSkillTemplateTest.RANDOM.nextInt(ValidateUploadSkillTemplateTest.CHARACTERS.length());
            sb.append(ValidateUploadSkillTemplateTest.CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
    public validateUploadSkillFromTemplate(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "AutomationSKill" + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[skill_name, "30", "New York", external_id]];
                let __page1: any = this;
        __page1 = __page1.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page1 = __page1.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page1 = __page1.launchSkillStudio();
        __page1 = __page1.getPageClass(SkillUploadFromTemplatePage);
        __page1 = __page1.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page1 = __page1.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page1 = __page1.uploadSkillsWithTemplate(source_name, true, "success");
        expect(__page1.Verify_Recent_Uploaded_Skill_Import_Loc(source_name, "success")).toBeVisible({ timeout: 30000 });
        __page1 = __page1.logoutSkillsStudio(OrganizationOperationPage);
    }

    public validateSkillStatusChange(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "AutomationSKill" + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[skill_name, "30", "New York", external_id]];
                let __page2: any = this;
        __page2 = __page2.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page2 = __page2.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page2 = __page2.launchSkillStudio();
        __page2 = __page2.getPageClass(SkillUploadFromTemplatePage);
        __page2 = __page2.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page2 = __page2.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page2 = __page2.uploadSkillsWithTemplate(source_name, true, "success");
        __page2 = __page2.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page2 = __page2.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page2 = __page2.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page2 = __page2.skillSearch(skill_name);
        expect(__page2.Skill_Label_Loc(skill_name)).toBeVisible({ timeout: 30000 });
        expect(__page2.Verify_Source_Name_Loc(source_name)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.skillsStatusOperation(skill_name, "Deactivate");
        expect(__page2.Verify_Skill_Status_Loc(skill_name, "inactive")).toBeVisible({ timeout: 30000 });
        __page2 = __page2.skillsStatusOperation(skill_name, "Activate");
        expect(__page2.Verify_Skill_Status_Loc(skill_name, "active")).toBeVisible({ timeout: 30000 });
        __page2 = __page2.logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyEditingSkillFromSkillLibraryPage(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "AutomationSKill" + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[skill_name, "30", "New York", external_id]];
                let __page3: any = this;
        __page3 = __page3.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page3 = __page3.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page3 = __page3.launchSkillStudio();
        __page3 = __page3.getPageClass(SkillUploadFromTemplatePage);
        __page3 = __page3.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page3 = __page3.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page3 = __page3.uploadSkillsWithTemplate(source_name, true, "success");
        __page3 = __page3.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page3 = __page3.skillSearch(skill_name);
        __page3 = __page3.clickOnSkillLabel(skill_name);
        __page3 = __page3.editSkillLabel("Update_"+skill_name);
        __page3 = __page3.editSkillDescription("Update description for"+skill_name);
        __page3 = __page3.clickSkillSaveChangesButton();
        __page3 = __page3.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page3 = __page3.skillSearch("Update_"+skill_name);
        expect(__page3.Skill_Update_Label_Loc("Update_"+skill_name)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationEnabled(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name]];
                let __page4: any = this;
        __page4 = __page4.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page4 = __page4.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page4 = __page4.launchSkillStudio();
        __page4 = __page4.getPageClass(SkillUploadFromTemplatePage);
        __page4 = __page4.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page4 = __page4.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page4 = __page4.uploadSkillsWithTemplate(source_name, true, "success");
        __page4 = __page4.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page4 = __page4.skillSearch(skill_name);
        __page4 = __page4.clickOnSkillLabel(skill_name);
        if ("ON" == "ON")
                {
                    expect(__page4.Linked_Skills_Graph_Equivalent_Loc("automation")).toBeVisible({ timeout: 30000 });
                }
                else
                {
                    expect(__page4.Linked_Skills_Graph_Equivalent_Loc("automation")).not.toBeVisible();
                }
        __page4 = __page4.logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationDisabled(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name]];
                let __page5: any = this;
        __page5 = __page5.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page5 = __page5.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page5 = __page5.launchSkillStudio();
        __page5 = __page5.getPageClass(SkillUploadFromTemplatePage);
        __page5 = __page5.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page5 = __page5.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page5 = __page5.mappingconfiguration("OFF");
        __page5 = __page5.uploadSkillsWithTemplate(source_name, true, "success");
        __page5 = __page5.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page5 = __page5.skillSearch(skill_name);
        __page5 = __page5.clickOnSkillLabel(skill_name);
        if ("OFF" == "ON")
                {
                    expect(__page5.Linked_Skills_Graph_Equivalent_Loc("automation")).toBeVisible({ timeout: 30000 });
                }
                else
                {
                    expect(__page5.Linked_Skills_Graph_Equivalent_Loc("automation")).not.toBeVisible();
                }
        __page5 = __page5.logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationDisabledAndWithLinkedSkillsGraphSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let equivalent_skill: string = "PLC";
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name, equivalent_skill]];
                let __page6: any = this;
        __page6 = __page6.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page6 = __page6.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page6 = __page6.launchSkillStudio();
        __page6 = __page6.getPageClass(SkillUploadFromTemplatePage);
        __page6 = __page6.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page6 = __page6.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page6 = __page6.mappingconfiguration("OFF");
        __page6 = __page6.uploadSkillsWithTemplate(source_name, true, "success");
        __page6 = __page6.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page6 = __page6.skillSearch(skill_name);
        __page6 = __page6.clickOnSkillLabel(skill_name);
        if ("ON" == "ON")
                {
                    expect(__page6.Linked_Skills_Graph_Equivalent_Loc(equivalent_skill)).toBeVisible({ timeout: 30000 });
                }
                else
                {
                    expect(__page6.Linked_Skills_Graph_Equivalent_Loc(equivalent_skill)).not.toBeVisible();
                }
        __page6 = __page6.logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationEnabledAndWithLinkedSkillsGraphSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let equivalent_skill: string = "PLC";
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name, equivalent_skill]];
                let __page7: any = this;
        __page7 = __page7.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page7 = __page7.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page7 = __page7.launchSkillStudio();
        __page7 = __page7.getPageClass(SkillUploadFromTemplatePage);
        __page7 = __page7.navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage);
        __page7 = __page7.createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage);
        __page7 = __page7.uploadSkillsWithTemplate(source_name, true, "success");
        __page7 = __page7.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage);
        __page7 = __page7.skillSearch(skill_name);
        __page7 = __page7.clickOnSkillLabel(skill_name);
        if ("ON" == "ON")
                {
                    expect(__page7.Linked_Skills_Graph_Equivalent_Loc(equivalent_skill)).toBeVisible({ timeout: 30000 });
                }
                else
                {
                    expect(__page7.Linked_Skills_Graph_Equivalent_Loc(equivalent_skill)).not.toBeVisible();
                }
        __page7 = __page7.logoutSkillsStudio(OrganizationOperationPage);
    }
}
