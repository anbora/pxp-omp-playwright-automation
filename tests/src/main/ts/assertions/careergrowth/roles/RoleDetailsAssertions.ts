// @ts-nocheck
import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { Assert, assertTrue } from "common/testing/runtime";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { expect } from "common/testing/playwright";

export class RoleDetailsAssertions extends BaseAssertion<RoleDetailsPage> {

    public static readonly DESIRED_SKILLS_BASED_ON_YOUR_PROFILE: string = "You have %d out of 16 of the desired skills based on your profile";
    public static readonly LEARNING_TARGET_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly ROLE_TARGET_LEVEL_COLUMN_NUMBER: number = 2;
    public static readonly MATCHING_SKILL_STATUS_COLUMN_NUMBER: number = 4;
    public static readonly MATCHING_SKILL_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER: number = 2;

    public assertThatRoleNameEqualTo(name: string): RoleDetailsAssertions {
        expect(this.page.roleNameLabel).toContainText(name, this.containsTextOptions);
//        this.page.roleNameLabel().should('contain.text', name)
        return this;
    }

	public assertThatMarkAsAspirationalRoleIsEnabled(): RoleDetailsAssertions {
        expect(this.page.markRoleAsAspirationalButton).toBeEnabled();
//        this.page.aspirationalRoleButton().should('not.be.disabled')
        return this;
    }

	public assertThatMarkAsAspirationalRoleIsDisabled(): RoleDetailsAssertions {
        expect(this.page.markRoleAsAspirationalButton).toBeDisabled();
//        this.page.aspirationalRoleButton().should('be.disabled')
        return this;
    }

	public assertThatMarkAsAspirationalRoleButtonIsDisplayed(): RoleDetailsAssertions {
        expect(this.page.markRoleAsAspirationalButton.first()).toBeVisible(this.isVisibleOptions);
//        this.page.aspirationalRoleButton().should('be.visible')
        return this;
    }

	public assertThatRoleIsMarkedAsAspirational(): RoleDetailsAssertions {
        expect(this.page.markedAsAspirationalRoleButton).toContainText("Job Role marked as aspirational", this.containsTextOptions);
//        this.page.markedAsAspirationalRoleButton().contains('Marked as aspirational Role')
        return this;
    }

	public assertThatRoleHasProperMatch(matchName: string): RoleDetailsAssertions {
        expect(this.page.matchingLabel.first()).toContainText(matchName, this.containsTextOptions);
        return this;
    }

	public assertThatSkillsMatchingDetailsIsVisible(): RoleDetailsAssertions {
        expect(this.page.skillsMatchDetails).toBeVisible(this.isVisibleOptions);
//        this.page.skillsMatchDetails().should('exist')
        return this;
    }

	public assertThatSkillsMatchLevelOnMatchingDetailsIsEqualTo(title: string): RoleDetailsAssertions {
        expect(this.page.skillsMatchDetailsTitle).toHaveAttribute("title", title);
//        this.page.skillsMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

	public assertThatExperienceMatchingDetailsIsVisible(): RoleDetailsAssertions {
        expect(this.page.experienceMatchDetails).toBeVisible(this.isVisibleOptions);
//        this.page.experienceMatchDetails().should('exist')
        return this;
    }

	public assertThatExperienceMatchLevelOnMatchingDetailsIsEqualTo(title: string): RoleDetailsAssertions {
        expect(this.page.experienceMatchDetailsTitle).toHaveAttribute("title", title);
//        this.page.experienceMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

	public assertThatThereIsGoodMatchIconFor(area: string): RoleDetailsAssertions {
        expect(this.page.matchIcon(area)).toHaveClass("matching-good icon-check-circle-light");
//        this.page.matchIcon(area).should('have', 'matching-good icon-check-circle-light')
        return this;
    }

	public assertThatThereIsBadMatchIconFor(area: string): RoleDetailsAssertions {
        expect(this.page.matchIcon(area)).toHaveClass("matching-bad icon-cross-circle");
//        this.page.matchIcon(area).should('have', 'matching-bad icon-cross-circle')
        return this;
    }

	public assertThatTooltipTextIsEqualTo(text: string): RoleDetailsAssertions {
        this.page.getPage().waitForLoadState();
        expect(this.page.toolTip).toContainText(text, this.containsTextOptions);
//        this.page.toolTip().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionDivValueContains(text: string): RoleDetailsAssertions {
        expect(this.page.divInDescription).toContainText(text, this.containsTextOptions);
//        this.page.divInDescription().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionH3ValueContains(text: string): RoleDetailsAssertions {
        expect(this.page.h3InDescription).toContainText(text, this.containsTextOptions);
//        this.page.h3InDescription().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionAValueContains(text: string): RoleDetailsAssertions {
        expect(this.page.aInDescription).toContainText(text, this.containsTextOptions);
//        this.page.aInDescription().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionStrongValueContains(text: string): RoleDetailsAssertions {
        expect(this.page.strongInDescription).toContainText(text, this.containsTextOptions);
//        this.page.strongInDescription().should('contain.text', text)
        return this;
    }

	public assertThatDismissButtonIsGrey(): RoleDetailsAssertions {
        expect(this.page.dismissButton).toBeVisible(this.isVisibleOptions);
//        this.page.dismissButton().should('exist')
        return this;
    }

	public assertThatDismissButtonIsRed(): RoleDetailsAssertions {
        expect(this.page.undismissButton).toBeVisible(this.isVisibleOptions);
//        this.page.undismissButton().should('exist')
        return this;
    }

	public assertThatCarouselCounterIsEqualTo(counter: string): RoleDetailsAssertions {
        expect(this.page.carouselCounter).toContainText(counter, this.containsTextOptions);
//        this.page.carouselCounter().should('contain.text', counter)
        return this;
    }

    public assertThatThereIsAtLeastOneOpenJobVacancy(): RoleDetailsAssertions {
        expect(this.page.jobsOnCarousel.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatThereIsNoOpenJobVacanciesForRole(): RoleDetailsAssertions {
        expect(this.page.noDataLabel.first()).toContainText("There are currently no similar Job Vacancies!", this.containsTextOptions);
        return this;
    }

	public assertThatTheNumberOfTheJobsOnCarouselIsEqualTo(number: number): RoleDetailsAssertions {
        expect(this.page.jobsOnCarousel).toHaveCount(number);
//        this.page.jobsOnCarousel().should('have.length', number)
        return this;
    }

	public assertThatThereIsJobTitleOnCarousel(title: string): RoleDetailsAssertions {
        expect(this.page.carouselJobTitle(title)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLocationForGivenJobOnCarouselIsEqualTo(jobTitle: string, location: string): RoleDetailsAssertions {
        expect(this.page.carouselJobLocationLabel(jobTitle)).toContainText(location, this.containsTextOptions);
        return this;
    }

	public assertThatTypeForGivenJobOnCarouselIsEqualTo(jobTitle: string, jobType: string): RoleDetailsAssertions {
        expect(this.page.carouselJobTypeLabel(jobTitle)).toContainText(jobType, this.containsTextOptions);
//        this.page.carouselJobTypeLabel(jobTitle).should('contain.text', jobType)
        return this;
    }

	public assertThatMatchForGivenJobOnCarouselIsEqualTo(jobTitle: string, match: string): RoleDetailsAssertions {
        expect(this.page.carouselJobMatchLabel(jobTitle)).toContainText(match, this.containsTextOptions);
//        this.page.carouselJobMatchLabel(jobTitle).should('contain.text', match)
        return this;
    }

	public assertThatMatchProgressBarForGivenJobOnCarouselIsEqualTo(jobTitle: string, width: string): RoleDetailsAssertions {
        expect(this.page.carouselJobMatchProgressBar(jobTitle)).toHaveAttribute("style", width);
//        this.page.carouselJobMatchProgressBar(jobTitle, width).should('exist')
        return this;
    }

    public assertThatSmileIconColorForJobVacancyOnCarouselIsEqualTo(jobTitle: string, rgbColor: string): RoleDetailsAssertions {
        expect(this.page.smileIconForJobVacancy(jobTitle)).toHaveCSS("fill", rgbColor);
        return this;
    }

    public assertThatSmileIconForJobVacancyOnCarouselIsEqualTo(jobTitle: string, source: string): RoleDetailsAssertions {
        expect(this.page.smileIconForJobVacancy(jobTitle)).toHaveAttribute("src", source);
        return this;
    }

	public assertThatSkillForGivenJobOnCarouselIsEqualTo(jobTitle: string, skill: string): RoleDetailsAssertions {
        expect(this.page.carouselSkillLabel(jobTitle)).toContainText(skill, this.containsTextOptions);;
        return this;
    }

	public assertThatLeftCarouselControlButtonIsDisplayed(): RoleDetailsAssertions {
        expect(this.page.leftCarouselControlButton).toBeEnabled();
//        this.page.leftCarouselControlButton().should('be.visible')
        return this;
    }

	public assertThatLeftCarouselControlButtonIsNotDisplayed(): RoleDetailsAssertions {
        expect(this.page.leftCarouselControlButton).toBeHidden();
//        this.page.leftCarouselControlButton().should('not.be.visible')
        return this;
    }

	public assertThatRightCarouselControlButtonIsDisplayed(): RoleDetailsAssertions {
        expect(this.page.rightCarouselControlButton).toBeVisible(this.isVisibleOptions);
//        this.page.rightCarouselControlButton().should('be.visible')
        return this;
    }

	public assertThatRightCarouselControlButtonIsNotDisplayed(): RoleDetailsAssertions {
        expect(this.page.rightCarouselControlButton).toBeHidden();
//        this.page.rightCarouselControlButton().should('not.be.visible')
        return this;
    }

    public assertThatLevelIsEqualTo(level: string): RoleDetailsAssertions {
        expect(this.page.levelLabel.first()).toContainText(level, this.containsTextOptions);
        return this;
    }

    public assertThatCareerPathIconNotExist(): RoleDetailsAssertions {
        expect(this.page.careerPathIcon).toBeHidden();
        this.page.logger.info("Successfully verified that path icon doesn't exist.");
        return this;
    }

    public assertThatCareerPathIconExist(): RoleDetailsAssertions {
        expect(this.page.careerPathIcon).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCareerPathHeaderNotExist(): RoleDetailsAssertions {
        expect(this.page.careerPathHeader).toBeHidden();
        this.page.logger.info("Successfully verified that path header doesn't exist.");
        return this;
    }

    public assertThatCareerPathHeaderIsEqualTo(header: string): RoleDetailsAssertions {
        expect(this.page.careerPathHeader).toContainText(header);
        return this;
    }

    public assertThatCareerPathDescriptionIsEqualTo(description: string): RoleDetailsAssertions {
        expect(this.page.careerPathDescription).toContainText(description);
        return this;
    }

    public assertNumberOfTheSkillsUserAlreadyHas(expectedSkillsNumber: number): RoleDetailsAssertions {
        expect(this.page.relatedSkillsLink).toHaveText(String.format(DESIRED_SKILLS_BASED_ON_YOUR_PROFILE, expectedSkillsNumber));
        return this;
    }

    public assertMatchingSkillUserLevelIs(skillLabel: string, level: string): RoleDetailsAssertions {
        expect(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER)).toHaveText(level);
        return this;
    }

    public assertMatchingSkillExpectedLevelIs(skillLabel: string, level: string): RoleDetailsAssertions {
        expect(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_LEVEL_COLUMN_NUMBER)).toHaveText(level);
        return this;
    }

    public assertMatchingSkillStatusIs(skillLabel: string, status: string): RoleDetailsAssertions {
        expect(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_STATUS_COLUMN_NUMBER)).toHaveText(status);
        return this;
    }

    public assertRoleTargetLevelForSkillIs(skillLabel: string, level: string): RoleDetailsAssertions {
        expect(this.page.learningGoalColumn(skillLabel, ROLE_TARGET_LEVEL_COLUMN_NUMBER).locator("p")).toHaveText(level);
        return this;
    }
    public assertLearningTargetLevelForSkillIs(skillLabel: string, level: string): RoleDetailsAssertions {
        expect(this.page.learningGoalColumn(skillLabel, LEARNING_TARGET_LEVEL_COLUMN_NUMBER).locator("//select/option[@selected]")).toHaveText(level);
        return this;
    }

    public assertSkillsOfIndicatedLevelContains(skillsLevel: string, expectedSkills: Set<string>): RoleDetailsAssertions {
        this.assertTrue(this.page.getSkillsOfLevel(skillsLevel).containsAll(expectedSkills));
        return this;
    }

    public assertSkillsOfIndicatedLevelHaveAtLeast(skillsLevel: string, expectedSkillsNumber: number): RoleDetailsAssertions {
        this.assertTrue(this.page.getSkillsOfLevel(skillsLevel).length>= expectedSkillsNumber);
        return this;
    }

// ------------------------------------- CAREER PATHS section ----------------------------------------------------------

    public assertThatStatusIconIsDisplayed(): RoleDetailsAssertions {
        expect(this.page.statusIcon).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatStatusMessageIsEqualTo(status: string): RoleDetailsAssertions {
        expect(this.page.statusMessage).toContainText(status, this.containsTextOptions);
        return this;
    }

    public assertThatStatusMessageDescriptionIsEqualTo(description: string): RoleDetailsAssertions {
        expect(this.page.statusMessageDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatCustomPillContainsText(description: string): RoleDetailsAssertions {
        expect(this.page.customPill).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatSubwayViewDescriptionIsEqualTo(description: string): RoleDetailsAssertions {
        expect(this.page.subwayViewDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatUserRoleNameIsEqualTo(roleName: string): RoleDetailsAssertions {
        expect(this.page.userRoleName).toContainText(roleName, this.containsTextOptions);
        this.page.logger.info("Successfully verified that user role name contains '" + roleName + "' text.");
        return this;
    }

    public assertThatPathIsDisplayed(number: string): RoleDetailsAssertions {
        expect(this.page.path(number)).toBeEnabled();
        return this;
    }

    public assertThatRolePositionOnTheGridIsEqualTo(roleName: string, rolePosition: string): RoleDetailsAssertions {
        Assert.assertTrue(this.page.rolePosition(roleName).getAttribute("class").contains(rolePosition));
        return this;
    }

    public assertThatGoalRoleNameIsEqualTo(role: string): RoleDetailsAssertions {
        expect(this.page.goalRoleName).toContainText(role, this.containsTextOptions);
        this.page.logger.info("Successfully verified that goal role name contains '" + role + "' text.");
        return this;
    }

    public assertThatNumberOfPathsIsEqualTo(number: string): RoleDetailsAssertions {
        expect(this.page.paths).toHaveCount(Integer.parseInt(number));
        return this;
    }

    public assertThatNumberOfMovesForThePathIsEqualTo(pathNo: string, number: string): RoleDetailsAssertions {
        expect(this.page.movesForGivenPath(pathNo)).toHaveCount(Integer.parseInt(number));
        return this;
    }

    public assertThatPathHasParameterForTheMove(pathNo: string, pathNoPlus1: string, stepNo: string, parameter: string): RoleDetailsAssertions {
        expect(this.page.moveForGivenStep(pathNo, pathNoPlus1, stepNo)).toHaveAttribute("d", parameter);
        return this;
    }

    public assertThatMoveWithinAPathIsHighlighted(pathNo: string, stepNo: string): RoleDetailsAssertions {
        Assert.assertTrue(this.page.moveByPathAndStep(pathNo, stepNo).getAttribute("class").contains("highlihgted"));
        return this;
    }

    public assertThatPathHasNoHighlightedMoves(pathNo: string): RoleDetailsAssertions {
        expect(this.page.highlightedMoveForGivenPath(pathNo)).toBeHidden();
        return this;
    }

    public assertThatNumberOfGridLinesIsEqualTo(number: string): RoleDetailsAssertions {
        expect(this.page.gridLine).toHaveCount(Integer.parseInt(number));
        return this;
    }

    public assertThatArrowIconIsDisplayedForPath(pathName: string): RoleDetailsAssertions {
        this.page.pause(2000);
        Assert.assertTrue(this.page.aspirationalIconForPath(pathName).getAttribute("class").contains("icon icon-bullseye-arrow active icon-selected"));
        return this;
    }

    public assertThatArrowIconIsNotDisplayedForPath(pathName: string): RoleDetailsAssertions {
        expect(this.page.aspirationalIconForPath(pathName)).toBeHidden();
        return this;
    }

    public assertThatBackgroundColorForARoleIsEqualTo(roleName: string, rgbColor: string): RoleDetailsAssertions {
        expect(this.page.roleBackgroundColor(roleName)).toHaveCSS("background-color", rgbColor);
        return this;
    }

    public assertThatRoleSummaryIsDisplayed(roleSummary: string): RoleDetailsAssertions {
        expect(this.page.descriptionBlock).toContainText(roleSummary);
        this.page.logger.info("Successfully verified data Role Summary is displayed");
        return this;
    }

    public assertThatAdditionalDescriptionIsDisplayed(additionalDescription: string): RoleDetailsAssertions {
        expect(this.page.descriptionBlock).toContainText(additionalDescription);
        this.page.logger.info("Successfully verified data Additional Description is displayed");
        return this;
    }

    public assertThatDescriptionIsDisplayed(description: string): RoleDetailsAssertions {
        expect(this.page.descriptionBlock).toContainText(description);
        this.page.logger.info("Successfully verified data Description is displayed");
        return this;
    }

    public assertThatLevelEngagementIsNotDisplayedInDetailsPage(): RoleDetailsAssertions {
        expect(this.page.roleDetailsLevel.last()).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatLevelEngagementIsDisplayedInDetailsPage(): RoleDetailsAssertions {
        expect(this.page.roleDetailsLevel.last()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnJobCardDetails(): RoleDetailsAssertions {
        expect(this.page.jobRoleDetailsLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobCardDetails(): RoleDetailsAssertions {
        expect(this.page.jobRoleDetailsLocation).toBeHidden();
        return this;
    }

    public assertThatRoleMessageIsEqualTo(message: string): RoleDetailsAssertions {
        expect(this.page.roleMessage).toContainText(message);
        return this;
    }
}
