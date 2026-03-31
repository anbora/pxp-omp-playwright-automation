// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class ManageCareerPreferencesFromProfileTest extends BaseRestTest {

    private careerGoal: string = "Career Goal";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Internship";
    private remote: string = "Remote";
    private temporary: string = "Temporary";
    private partTime: string = "Part time";
    private individualContributor: string = "Individual contributor";
    private updateAlert: string = "Career preferences updated";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddPreferencesInProfileSettings(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.editProfile();
        __page1 = __page1.goToCareerPreferencesTab();
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerGoal, this.backward);
        __page1 = __page1.addCareerPreference(this.level, this.internship);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.workplaceModel, this.remote);
        __page1 = __page1.addCareerPreference(this.jobType, this.temporary);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.schedule, this.partTime);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor);
        expect(__page1.successAlertBox).toContainText(this.updateAlert, { timeout: 30000 });
        if (this.backward != null) {
                    expect(__page1.preferenceInput(this.careerGoal, this.backward)).toBeChecked();
                    return this;
                }
        expect(__page1.optionCheckbox(this.careerGoal)).toBeChecked();
        if (this.individualContributor != null) {
                    expect(__page1.preferenceInput(this.careerTrack, this.individualContributor)).toBeChecked();
                    return this;
                }
        expect(__page1.optionCheckbox(this.careerTrack)).toBeChecked();
        __page1 = __page1.waitForResponse();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        if (this.backward != null) {
                    expect(__page1.preferenceInput(this.careerGoal, this.backward)).toBeChecked();
                    return this;
                }
        expect(__page1.optionCheckbox(this.careerGoal)).toBeChecked();
        expect(__page1.optionChip(this.level, this.internship)).toBeVisible({ timeout: 30000 });
        if (this.remote != null) {
                    expect(__page1.preferenceInput(this.workplaceModel, this.remote)).toBeChecked();
                    return this;
                }
        expect(__page1.optionCheckbox(this.workplaceModel)).toBeChecked();
        expect(__page1.optionChip(this.jobType, this.temporary)).toBeVisible({ timeout: 30000 });
        if (this.partTime != null) {
                    expect(__page1.preferenceInput(this.schedule, this.partTime)).toBeChecked();
                    return this;
                }
        expect(__page1.optionCheckbox(this.schedule)).toBeChecked();
        if (this.individualContributor != null) {
                    expect(__page1.preferenceInput(this.careerTrack, this.individualContributor)).toBeChecked();
                    return this;
                }
        expect(__page1.optionCheckbox(this.careerTrack)).toBeChecked();
    }

    public shouldUpdateCareerProfileByRemovingPreferences(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToProfileFromUserDropDown(this.user.name);
        __page2 = __page2.editProfile();
        __page2 = __page2.goToCareerPreferencesTab();
        __page2 = __page2.selectCareerPreferenceCheckbox(this.careerGoal, this.backward);
        __page2 = __page2.removeCareerPreference(this.level, this.internship);
        __page2 = __page2.selectCareerPreferenceCheckbox(this.workplaceModel, this.remote);
        __page2 = __page2.removeCareerPreference(this.jobType, this.temporary);
        __page2 = __page2.selectCareerPreferenceCheckbox(this.schedule, this.partTime);
        __page2 = __page2.selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor);
        expect(__page2.successAlertBox).toContainText(this.updateAlert, { timeout: 30000 });
        if (this.backward != null) {
                    expect(__page2.preferenceInput(this.careerGoal, this.backward)).not.toBeChecked();
                    return this;
                }
        expect(__page2.optionCheckbox(this.careerGoal)).not.toBeChecked();
        expect(__page2.emptyStateInput(this.level)).toBeVisible({ timeout: 30000 });
        if (this.remote != null) {
                    expect(__page2.preferenceInput(this.workplaceModel, this.remote)).not.toBeChecked();
                    return this;
                }
        expect(__page2.optionCheckbox(this.workplaceModel)).not.toBeChecked();
        expect(__page2.emptyStateInput(this.jobType)).toBeVisible({ timeout: 30000 });
        if (this.partTime != null) {
                    expect(__page2.preferenceInput(this.schedule, this.partTime)).not.toBeChecked();
                    return this;
                }
        expect(__page2.optionCheckbox(this.schedule)).not.toBeChecked();
        if (this.individualContributor != null) {
                    expect(__page2.preferenceInput(this.careerTrack, this.individualContributor)).not.toBeChecked();
                    return this;
                }
        expect(__page2.optionCheckbox(this.careerTrack)).not.toBeChecked();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
