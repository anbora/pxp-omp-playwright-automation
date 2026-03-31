// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { expect } from "common/testing/playwright";

export class CareerPathAssertions extends BaseAssertion<CareerPathPage_New> {

    public assertThatGalaxyViewIsDisplayed(): CareerPathAssertions {
        expect(this.page.galaxyView).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatGalaxyViewIsNotDisplayed(): CareerPathAssertions {
        expect(this.page.galaxyView).toBeHidden();
        return this;
    }

    public assertThatShowPanelIsNotDisplayed(): CareerPathAssertions {
        expect(this.page.showPanelButton).toBeHidden();
        return this;
    }

    public assertThatShowPanelIsDisplayed(): CareerPathAssertions {
        expect(this.page.showPanelButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleCardIsNotDisplayed(roleName: string): CareerPathAssertions {
        expect(this.page.roleCard(roleName)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatRoleCardIsDisplayed(roleName: string): CareerPathAssertions {
        expect(this.page.roleCard(roleName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleCardsPanelIsCollapsed(): CareerPathAssertions {
        expect(this.page.galaxyViewDetailPanel).toHaveClass("galaxy-view-detail__panel --collapsed");
        return this;
    }

    public assertThatExploreJobRolesTipIsDisplayed(tip: string): CareerPathAssertions {
        expect(this.page.exploreJobRoleTip).toContainText(tip, this.containsTextOptions);
        return this;
    }

    public assertThatNoDataIconIsDisplayed(): CareerPathAssertions {
        expect(this.page.noDataIcon).toHaveClass("icon-route");
        return this;
    }

    public assertThatJobFamilySectionLineIsDisplayed(jobFamily: string): CareerPathAssertions {
        expect(this.page.jobFamilySectionLineTitle(jobFamily)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobFamilySectionLineHasTitleEqualTo(jobFamily: string): CareerPathAssertions {
        expect(this.page.jobFamilySectionLine).toContainText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatCurrentRoleIsEqualTo(roleName: string): CareerPathAssertions {
        expect(this.page.currentRoleName(roleName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleNamePillIsNotDisplayed(roleName: string): CareerPathAssertions {
        expect(this.page.rolePill(roleName)).toBeHidden();
        return this;
    }

    public assertThatRoleNamePillIsDisplayed(roleName: string): CareerPathAssertions {
        expect(this.page.rolePill(roleName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleLevelIsDisplayed(roleLevelValue: string): CareerPathAssertions {
        expect(this.page.roleLevel.first()).toContainText(roleLevelValue, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Role level is displayed.");
        return this;
    }

    public assertThatRoleAreaIsDisplayed(roleAreaValue: string): CareerPathAssertions {
        expect(this.page.roleArea(roleAreaValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleSkillsAreDisplayed(): CareerPathAssertions {
        expect(this.page.roleSkills).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Role skills are displayed.");
        return this;
    }

    public assertThatRoleIsMarkedAsAspirational(nextRoleSecond: string): CareerPathAssertions {
        expect(this.page.roleIsMarkedAspirational(nextRoleSecond)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleNamePillIsCollapsed(roleName: string): CareerPathAssertions {
        Assert.assertTrue(this.page.rolePillName(roleName).first().getAttribute("class").contains("cp-role-pill--collapsed"));
        return this;
    }

    public assertThatTheNumberOfRolePillsIsEqualTo(number: number): CareerPathAssertions {
        expect(this.page.rolePills).toHaveCount(number);
        return this;
    }

    public assertThatTheNumberOfRolesWithinGroupedPillsIsEqualTo(jobFamily: string, orderNumber: string, number: string): CareerPathAssertions {
        expect(this.page.groupedRolesNumber(jobFamily, orderNumber)).toContainText(number, this.containsTextOptions);
        return this;
    }

    public assertThatJobRoleNameOnCardDetailsIsEqualTo(roleName: string): CareerPathAssertions {
        expect(this.page.jobRoleNameOnRoleDetailsCard).toContainText(roleName, this.containsTextOptions);
        return this;
    }

    public assertThatSmileIconColorForRolePillIsEqualTo(roleName: string, rgbColor: string): CareerPathAssertions {
        expect(this.page.smileIconForRolePill(roleName)).toHaveCSS("fill", rgbColor);
        return this;
    }

    public assertThatSmileIconColorForCollapsedRolePillIsEqualTo(roleName: string, rgbColor: string): CareerPathAssertions {
        expect(this.page.smileIconForCollapsedRolePill(roleName)).toHaveCSS("fill", rgbColor);
        return this;
    }

    public assertThatCollapsedGroupedRolesPillContainsSmileIconWhichColorIsEqualTo(jobFamily: string, pillNumber: string, smileIconNumber: string, rgbColor: string): CareerPathAssertions {
        expect(this.page.smileIconForGroupedRolesPill(jobFamily, pillNumber, smileIconNumber)).toHaveCSS("fill", rgbColor);
        return this;
    }

    public assertThatSmileIconColorForRoleCardIsEqualTo(roleName: string, rgbColor: string): CareerPathAssertions {
        expect(this.page.roleCardSmile(roleName)).toHaveCSS("fill", rgbColor);
        return this;
    }

    public assertThatRoleCardLevelIsEqualTo(roleName: string, level: string): CareerPathAssertions {
        expect(this.page.roleCardLevelLabel(roleName)).toContainText(level, this.containsTextOptions);
        return this;
    }

    public assertThatRoleCardFamilyIsEqualTo(roleName: string, jobFamily: string): CareerPathAssertions {
        expect(this.page.roleCardFamilyLabel(roleName)).toContainText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatRoleCardMatchingIsEqualTo(roleName: string, matching: string): CareerPathAssertions {
        expect(this.page.roleCardMatchingLabel(roleName)).toContainText(matching, this.containsTextOptions);
        return this;
    }

    public assertThatRoleCardSkillIsDisplayed(roleName: string, skillName: string): CareerPathAssertions {
        expect(this.page.roleCardSkillsLabel(roleName, skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatGalaxyViewBoxParameterIsEqualTo(parameter: string): CareerPathAssertions {
        expect(this.page.galaxyViewBox).toHaveAttribute("viewBox", parameter);
        return this;
    }

    public assertThatGalaxyViewRingParameterIsEqualTo(ringNumber: string, parameter: string): CareerPathAssertions {
        expect(this.page.galaxyRing(ringNumber)).toHaveAttribute("r", parameter);
        return this;
    }

    public assertThatRolePillLocationIsEqualTo(roleName: string, xAxis: string, yAxis: string): CareerPathAssertions {
        expect(this.page.rolePillLocation(roleName)).toHaveAttribute("x", xAxis);
        expect(this.page.rolePillLocation(roleName)).toHaveAttribute("y", yAxis);
        return this;
    }
}
