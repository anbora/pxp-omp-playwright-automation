// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { Gson, JsonReader, TypeToken } from "common/testing/json";
import { WorkHistoryItem } from "models/job/WorkHistoryItem";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertEquals, assertTrue } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENER, ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENER);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.refreshPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSelectFile();
        __page1 = __page1.uploadFile(this.cvFilePath, this.documentName);
        expect(__page1.documentName).toContainText(this.documentName, { timeout: 30000 });
        __page1 = __page1.clickUploadButton();
        Assert.assertEquals(__page1.getWorkHistory(), this.expectedWorkHistory);
        __page1 = __page1.clickNextButton();
        __page1 = __page1.unselectAllSkills();
        __page1 = __page1.markParsedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING);
        __page1 = __page1.selectSkillLevel(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING, "Expert");
        __page1 = __page1.markParsedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE);
        __page1 = __page1.selectSkillLevel(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE, "Beginner");
        __page1 = __page1.clickAddButton();
        __page1 = __page1.clickXButtonAndStayInModal();
        expect(__page1.warning).toHaveText(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.UNSAVED_WORK_HISTORIES);
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickXButtonAndStayInModal();
        expect(__page1.warning).toHaveText(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.UNSAVED_SKILLS);
        __page1 = __page1.clickAddFirstSuggestedSkill(this.suggestedSkillContainer, "Intermediate");
        __page1 = __page1.clickMoreSkills(this.moreSkillsContainer);
        __page1 = __page1.markSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE);
        __page1 = __page1.selectLevelForSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE, "Advanced");
        __page1 = __page1.clickAdd();
        Assert.assertTrue(__page1.skillsOfLevel("Beginner").allTextContents().contains(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE.toLowerCase()), "Skill of name " + ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE.toLowerCase() + " is missing!");
        Assert.assertTrue(__page1.skillsOfLevel("Intermediate").allTextContents().contains(this.suggestedSkillContainer.getValue()), "Skill of name " + this.suggestedSkillContainer.getValue() + " is missing!");
        Assert.assertTrue(__page1.skillsOfLevel("Expert").allTextContents().contains(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING.toLowerCase()), "Skill of name " + ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING.toLowerCase() + " is missing!");
        Assert.assertTrue(__page1.skillsOfLevel("Advanced").allTextContents().contains(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE), "Skill of name " + ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE + " is missing!");
        const remainingSuggestedSkills = __page1.moreSkillsButton.textContent() ?? "";
        const match = remainingSuggestedSkills.match(Pattern.compile("\\d+"));
        if (match != null) {
                    Assert.assertEquals(Integer.parseInt(this.moreSkillsContainer.getValue()), Integer.parseInt(match[0]) + 1);
                }
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        expect(__page1.addedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.CUSTOMER_SERVICE.toLowerCase())).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(this.suggestedSkillContainer.getValue().toLowerCase())).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.GARDENING.toLowerCase())).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(ReviewAndManageParsedSkillsAndHistoryInCareerProfileTest.HORTICULTURE.toLowerCase())).toBeVisible({ timeout: 30000 });
//                    .assertSkillHasGotAdvancedLevelIcon(HORTICULTURE.toLowerCase());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
