import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";

export class CareerPathAssertions extends BaseAssertion<CareerPathPage_New> {

    public assertThatGalaxyViewIsDisplayed(): CareerPathAssertions {
        this.assertThat(this.page.galaxyView).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatGalaxyViewIsNotDisplayed(): CareerPathAssertions {
        this.assertThat(this.page.galaxyView).isHidden();
        return this;
    }

    public assertThatShowPanelIsNotDisplayed(): CareerPathAssertions {
        this.assertThat(this.page.showPanelButton).isHidden();
        return this;
    }

    public assertThatShowPanelIsDisplayed(): CareerPathAssertions {
        this.assertThat(this.page.showPanelButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleCardIsNotDisplayed(roleName: string): CareerPathAssertions {
        this.assertThat(this.page.roleCard(roleName)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatRoleCardIsDisplayed(roleName: string): CareerPathAssertions {
        this.assertThat(this.page.roleCard(roleName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleCardsPanelIsCollapsed(): CareerPathAssertions {
        this.assertThat(this.page.galaxyViewDetailPanel).hasClass("galaxy-view-detail__panel --collapsed");
        return this;
    }

    public assertThatExploreJobRolesTipIsDisplayed(tip: string): CareerPathAssertions {
        this.assertThat(this.page.exploreJobRoleTip).containsText(tip, this.containsTextOptions);
        return this;
    }

    public assertThatNoDataIconIsDisplayed(): CareerPathAssertions {
        this.assertThat(this.page.noDataIcon).hasClass("icon-route");
        return this;
    }

    public assertThatJobFamilySectionLineIsDisplayed(jobFamily: string): CareerPathAssertions {
        this.assertThat(this.page.jobFamilySectionLineTitle(jobFamily)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobFamilySectionLineHasTitleEqualTo(jobFamily: string): CareerPathAssertions {
        this.assertThat(this.page.jobFamilySectionLine).containsText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatCurrentRoleIsEqualTo(roleName: string): CareerPathAssertions {
        this.assertThat(this.page.currentRoleName(roleName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleNamePillIsNotDisplayed(roleName: string): CareerPathAssertions {
        this.assertThat(this.page.rolePill(roleName)).isHidden();
        return this;
    }

    public assertThatRoleNamePillIsDisplayed(roleName: string): CareerPathAssertions {
        this.assertThat(this.page.rolePill(roleName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleLevelIsDisplayed(roleLevelValue: string): CareerPathAssertions {
        this.assertThat(this.page.roleLevel.first()).containsText(roleLevelValue, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Role level is displayed.");
        return this;
    }

    public assertThatRoleAreaIsDisplayed(roleAreaValue: string): CareerPathAssertions {
        this.assertThat(this.page.roleArea(roleAreaValue)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleSkillsAreDisplayed(): CareerPathAssertions {
        this.assertThat(this.page.roleSkills).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Role skills are displayed.");
        return this;
    }

    public assertThatRoleIsMarkedAsAspirational(nextRoleSecond: string): CareerPathAssertions {
        this.assertThat(this.page.roleIsMarkedAspirational(nextRoleSecond)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRoleNamePillIsCollapsed(roleName: string): CareerPathAssertions {
        Assert.assertTrue(this.page.rolePillName(roleName).first().getAttribute("class").contains("cp-role-pill--collapsed"));
        return this;
    }

    public assertThatTheNumberOfRolePillsIsEqualTo(number: number): CareerPathAssertions {
        this.assertThat(this.page.rolePills).hasCount(number);
        return this;
    }

    public assertThatTheNumberOfRolesWithinGroupedPillsIsEqualTo(jobFamily: string, orderNumber: string, number: string): CareerPathAssertions {
        this.assertThat(this.page.groupedRolesNumber(jobFamily, orderNumber)).containsText(number, this.containsTextOptions);
        return this;
    }

    public assertThatJobRoleNameOnCardDetailsIsEqualTo(roleName: string): CareerPathAssertions {
        this.assertThat(this.page.jobRoleNameOnRoleDetailsCard).containsText(roleName, this.containsTextOptions);
        return this;
    }

    public assertThatSmileIconColorForRolePillIsEqualTo(roleName: string, rgbColor: string): CareerPathAssertions {
        this.assertThat(this.page.smileIconForRolePill(roleName)).hasCSS("fill", rgbColor);
        return this;
    }

    public assertThatSmileIconColorForCollapsedRolePillIsEqualTo(roleName: string, rgbColor: string): CareerPathAssertions {
        this.assertThat(this.page.smileIconForCollapsedRolePill(roleName)).hasCSS("fill", rgbColor);
        return this;
    }

    public assertThatCollapsedGroupedRolesPillContainsSmileIconWhichColorIsEqualTo(jobFamily: string, pillNumber: string, smileIconNumber: string, rgbColor: string): CareerPathAssertions {
        this.assertThat(this.page.smileIconForGroupedRolesPill(jobFamily, pillNumber, smileIconNumber)).hasCSS("fill", rgbColor);
        return this;
    }

    public assertThatSmileIconColorForRoleCardIsEqualTo(roleName: string, rgbColor: string): CareerPathAssertions {
        this.assertThat(this.page.roleCardSmile(roleName)).hasCSS("fill", rgbColor);
        return this;
    }

    public assertThatRoleCardLevelIsEqualTo(roleName: string, level: string): CareerPathAssertions {
        this.assertThat(this.page.roleCardLevelLabel(roleName)).containsText(level, this.containsTextOptions);
        return this;
    }

    public assertThatRoleCardFamilyIsEqualTo(roleName: string, jobFamily: string): CareerPathAssertions {
        this.assertThat(this.page.roleCardFamilyLabel(roleName)).containsText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatRoleCardMatchingIsEqualTo(roleName: string, matching: string): CareerPathAssertions {
        this.assertThat(this.page.roleCardMatchingLabel(roleName)).containsText(matching, this.containsTextOptions);
        return this;
    }

    public assertThatRoleCardSkillIsDisplayed(roleName: string, skillName: string): CareerPathAssertions {
        this.assertThat(this.page.roleCardSkillsLabel(roleName, skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatGalaxyViewBoxParameterIsEqualTo(parameter: string): CareerPathAssertions {
        this.assertThat(this.page.galaxyViewBox).hasAttribute("viewBox", parameter);
        return this;
    }

    public assertThatGalaxyViewRingParameterIsEqualTo(ringNumber: string, parameter: string): CareerPathAssertions {
        this.assertThat(this.page.galaxyRing(ringNumber)).hasAttribute("r", parameter);
        return this;
    }

    public assertThatRolePillLocationIsEqualTo(roleName: string, xAxis: string, yAxis: string): CareerPathAssertions {
        this.assertThat(this.page.rolePillLocation(roleName)).hasAttribute("x", xAxis);
        this.assertThat(this.page.rolePillLocation(roleName)).hasAttribute("y", yAxis);
        return this;
    }
}
