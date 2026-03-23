import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { SkillsLibraryAssertions } from "skillstudio/assertions/SkillsLibraryAssertions";
import { SkillUpdateFromTemplateAssertions } from "skillstudio/assertions/SkillUpdateFromTemplateAssertions";
import { OrganizationOperationPage } from "skillstudio/pages/OrganizationOperationPage";
import { SkillsLibraryPage } from "skillstudio/pages/SkillsLibraryPage";
import { SkillUploadFromTemplatePage } from "skillstudio/pages/SkillUploadFromTemplatePage";

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
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public validateSkillStatusChange(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "AutomationSKill" + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[skill_name, "30", "New York", external_id]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .uploadSkillsWithTemplate(source_name, true,"success")
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(skill_name)
                .check(SkillsLibraryAssertions)
                .VerifySkillIsPresent(skill_name)
                .VerifySourceName(source_name)
                .endAssertion()
                .skillsStatusOperation(skill_name, "Deactivate")
                .check(SkillsLibraryAssertions)
                .VerifySkillStatus(skill_name, "inactive")
                .endAssertion()
                .skillsStatusOperation(skill_name, "Activate")
                .check(SkillsLibraryAssertions)
                .VerifySkillStatus(skill_name,"active")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyEditingSkillFromSkillLibraryPage(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "AutomationSKill" + this.rand.nextInt(10000);
        let external_id: string = "AutoExternalID" + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en", "Description-en", "Synonyms-en", "External ID"];
        let data: string[][] = [[skill_name, "30", "New York", external_id]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .uploadSkillsWithTemplate(source_name, true,"success")
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(skill_name)
                .clickOnSkillLabel(skill_name)
                .editSkillLabel("Update_"+skill_name)
                .editSkillDescription("Update description for"+skill_name)
                .clickSkillSaveChangesButton()
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch("Update_"+skill_name)
                .check(SkillsLibraryAssertions)
                .verifyUpdateSkillName("Update_"+skill_name)
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationEnabled(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .uploadSkillsWithTemplate(source_name, true,"success")
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(skill_name)
                .clickOnSkillLabel(skill_name)
                .check(SkillsLibraryAssertions)
                .verifyLinkedSkillGraphSkill("automation","ON")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationDisabled(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .mappingconfiguration("OFF")
                .uploadSkillsWithTemplate(source_name, true,"success")
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(skill_name)
                .clickOnSkillLabel(skill_name)
                .check(SkillsLibraryAssertions)
                .verifyLinkedSkillGraphSkill("automation","OFF")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationDisabledAndWithLinkedSkillsGraphSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let equivalent_skill: string = "PLC";
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name, equivalent_skill]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .mappingconfiguration("OFF")
                .uploadSkillsWithTemplate(source_name, true,"success")
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(skill_name)
                .clickOnSkillLabel(skill_name)
                .check(SkillsLibraryAssertions)
                .verifyLinkedSkillGraphSkill(equivalent_skill,"ON")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }

    public verifyUploadSkillWithMappingConfigurationEnabledAndWithLinkedSkillsGraphSkill(): void {
        let source_name: string = "AutomationSourceName" + this.rand.nextInt(10000);
        let skill_name: string = "Automation " + this.rand.nextInt(10000);
        let equivalent_skill: string = "PLC";
        let headers: string[] = ["Label-en","Linked Skills Graph Skill", "Linked Skills Graph Skill ID"];
        let data: string[][] = [[skill_name, equivalent_skill]];
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(SkillUploadFromTemplatePage)
                .navigateHumbergenMenu(this.skill_import_nav_path, SkillUploadFromTemplatePage)
                .createExcelFile(headers, data, this.filePath, SkillUploadFromTemplatePage)
                .uploadSkillsWithTemplate(source_name, true,"success")
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, SkillsLibraryPage)
                .skillSearch(skill_name)
                .clickOnSkillLabel(skill_name)
                .check(SkillsLibraryAssertions)
                .verifyLinkedSkillGraphSkill(equivalent_skill,"ON")
                .endAssertion()
                .logoutSkillsStudio(OrganizationOperationPage);
    }
}
