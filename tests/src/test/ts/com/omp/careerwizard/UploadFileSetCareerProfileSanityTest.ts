// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSelectFile();
        __page1 = __page1.uploadFile(this.filePath, this.christopherDocumentName);
        expect(__page1.documentName).toContainText(this.christopherDocumentName, { timeout: 30000 });
        __page1 = __page1.clickUploadButton();
        __page1 = __page1.clickNextButton();
        __page1 = __page1.clickAddButton();
        expect(__page1.workHistoryLineLabel(this.workHistoryPosition).first()).toBeVisible({ timeout: 30000 });
    }

    public shouldUploadFileAndVerifyTheJobTitleValidation(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.clickUpdateCareerProfileLink();
        __page2 = __page2.clickSelectFile();
        __page2 = __page2.uploadFile(this.filePath, this.timDocumentName);
        expect(__page2.documentName).toContainText(this.timDocumentName, { timeout: 30000 });
        __page2 = __page2.clickUploadButton();
        expect(__page2.documentName).toContainText(this.timDocumentName, { timeout: 30000 });
        expect(__page2.addTitleError).toBeVisible({ timeout: 30000 });
        __page2 = __page2.editJobTitle(this.jobTitleAdded);
        expect(__page2.addTitleError).not.toBeVisible({ timeout: 5000 });
        __page2 = __page2.clickNextButton();
        __page2 = __page2.clickAddButton();
        expect(__page2.workHistoryLineLabel(this.jobTitleAdded).first()).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
