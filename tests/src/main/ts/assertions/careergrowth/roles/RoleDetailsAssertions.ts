import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert, assertTrue } from "common/testing/runtime";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";

export class RoleDetailsAssertions extends BaseAssertion<RoleDetailsPage> {

    public static readonly DESIRED_SKILLS_BASED_ON_YOUR_PROFILE: string = "You have %d out of 16 of the desired skills based on your profile";
    public static readonly LEARNING_TARGET_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly ROLE_TARGET_LEVEL_COLUMN_NUMBER: number = 2;
    public static readonly MATCHING_SKILL_STATUS_COLUMN_NUMBER: number = 4;
    public static readonly MATCHING_SKILL_LEVEL_COLUMN_NUMBER: number = 3;
    public static readonly MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER: number = 2;

    public assertThatRoleNameEqualTo(name: string): RoleDetailsAssertions {
        this.assertThat(this.page.roleNameLabel).containsText(name, this.containsTextOptions);
//        this.page.roleNameLabel().should('contain.text', name)
        return this;
    }

	public assertThatMarkAsAspirationalRoleIsEnabled(): RoleDetailsAssertions {
        this.assertThat(this.page.markRoleAsAspirationalButton).isEnabled();
//        this.page.aspirationalRoleButton().should('not.be.disabled')
        return this;
    }

	public assertThatMarkAsAspirationalRoleIsDisabled(): RoleDetailsAssertions {
        this.assertThat(this.page.markRoleAsAspirationalButton).isDisabled();
//        this.page.aspirationalRoleButton().should('be.disabled')
        return this;
    }

	public assertThatMarkAsAspirationalRoleButtonIsDisplayed(): RoleDetailsAssertions {
        this.assertThat(this.page.markRoleAsAspirationalButton.first()).isVisible(this.isVisibleOptions);
//        this.page.aspirationalRoleButton().should('be.visible')
        return this;
    }

	public assertThatRoleIsMarkedAsAspirational(): RoleDetailsAssertions {
        this.assertThat(this.page.markedAsAspirationalRoleButton).containsText("Job Role marked as aspirational", this.containsTextOptions);
//        this.page.markedAsAspirationalRoleButton().contains('Marked as aspirational Role')
        return this;
    }

	public assertThatRoleHasProperMatch(matchName: string): RoleDetailsAssertions {
        this.assertThat(this.page.matchingLabel.first()).containsText(matchName, this.containsTextOptions);
        return this;
    }

	public assertThatSkillsMatchingDetailsIsVisible(): RoleDetailsAssertions {
        this.assertThat(this.page.skillsMatchDetails).isVisible(this.isVisibleOptions);
//        this.page.skillsMatchDetails().should('exist')
        return this;
    }

	public assertThatSkillsMatchLevelOnMatchingDetailsIsEqualTo(title: string): RoleDetailsAssertions {
        this.assertThat(this.page.skillsMatchDetailsTitle).hasAttribute("title", title);
//        this.page.skillsMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

	public assertThatExperienceMatchingDetailsIsVisible(): RoleDetailsAssertions {
        this.assertThat(this.page.experienceMatchDetails).isVisible(this.isVisibleOptions);
//        this.page.experienceMatchDetails().should('exist')
        return this;
    }

	public assertThatExperienceMatchLevelOnMatchingDetailsIsEqualTo(title: string): RoleDetailsAssertions {
        this.assertThat(this.page.experienceMatchDetailsTitle).hasAttribute("title", title);
//        this.page.experienceMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

	public assertThatThereIsGoodMatchIconFor(area: string): RoleDetailsAssertions {
        this.assertThat(this.page.matchIcon(area)).hasClass("matching-good icon-check-circle-light");
//        this.page.matchIcon(area).should('have', 'matching-good icon-check-circle-light')
        return this;
    }

	public assertThatThereIsBadMatchIconFor(area: string): RoleDetailsAssertions {
        this.assertThat(this.page.matchIcon(area)).hasClass("matching-bad icon-cross-circle");
//        this.page.matchIcon(area).should('have', 'matching-bad icon-cross-circle')
        return this;
    }

	public assertThatTooltipTextIsEqualTo(text: string): RoleDetailsAssertions {
        this.page.getPage().waitForLoadState();
        this.assertThat(this.page.toolTip).containsText(text, this.containsTextOptions);
//        this.page.toolTip().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionDivValueContains(text: string): RoleDetailsAssertions {
        this.assertThat(this.page.divInDescription).containsText(text, this.containsTextOptions);
//        this.page.divInDescription().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionH3ValueContains(text: string): RoleDetailsAssertions {
        this.assertThat(this.page.h3InDescription).containsText(text, this.containsTextOptions);
//        this.page.h3InDescription().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionAValueContains(text: string): RoleDetailsAssertions {
        this.assertThat(this.page.aInDescription).containsText(text, this.containsTextOptions);
//        this.page.aInDescription().should('contain.text', text)
        return this;
    }

	public assertThatRoleDescriptionStrongValueContains(text: string): RoleDetailsAssertions {
        this.assertThat(this.page.strongInDescription).containsText(text, this.containsTextOptions);
//        this.page.strongInDescription().should('contain.text', text)
        return this;
    }

	public assertThatDismissButtonIsGrey(): RoleDetailsAssertions {
        this.assertThat(this.page.dismissButton).isVisible(this.isVisibleOptions);
//        this.page.dismissButton().should('exist')
        return this;
    }

	public assertThatDismissButtonIsRed(): RoleDetailsAssertions {
        this.assertThat(this.page.undismissButton).isVisible(this.isVisibleOptions);
//        this.page.undismissButton().should('exist')
        return this;
    }

	public assertThatCarouselCounterIsEqualTo(counter: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselCounter).containsText(counter, this.containsTextOptions);
//        this.page.carouselCounter().should('contain.text', counter)
        return this;
    }

    public assertThatThereIsAtLeastOneOpenJobVacancy(): RoleDetailsAssertions {
        this.assertThat(this.page.jobsOnCarousel.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatThereIsNoOpenJobVacanciesForRole(): RoleDetailsAssertions {
        this.assertThat(this.page.noDataLabel.first()).containsText("There are currently no similar Job Vacancies!", this.containsTextOptions);
        return this;
    }

	public assertThatTheNumberOfTheJobsOnCarouselIsEqualTo(number: number): RoleDetailsAssertions {
        this.assertThat(this.page.jobsOnCarousel).hasCount(number);
//        this.page.jobsOnCarousel().should('have.length', number)
        return this;
    }

	public assertThatThereIsJobTitleOnCarousel(title: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselJobTitle(title)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLocationForGivenJobOnCarouselIsEqualTo(jobTitle: string, location: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselJobLocationLabel(jobTitle)).containsText(location, this.containsTextOptions);
        return this;
    }

	public assertThatTypeForGivenJobOnCarouselIsEqualTo(jobTitle: string, jobType: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselJobTypeLabel(jobTitle)).containsText(jobType, this.containsTextOptions);
//        this.page.carouselJobTypeLabel(jobTitle).should('contain.text', jobType)
        return this;
    }

	public assertThatMatchForGivenJobOnCarouselIsEqualTo(jobTitle: string, match: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselJobMatchLabel(jobTitle)).containsText(match, this.containsTextOptions);
//        this.page.carouselJobMatchLabel(jobTitle).should('contain.text', match)
        return this;
    }

	public assertThatMatchProgressBarForGivenJobOnCarouselIsEqualTo(jobTitle: string, width: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselJobMatchProgressBar(jobTitle)).hasAttribute("style", width);
//        this.page.carouselJobMatchProgressBar(jobTitle, width).should('exist')
        return this;
    }

    public assertThatSmileIconColorForJobVacancyOnCarouselIsEqualTo(jobTitle: string, rgbColor: string): RoleDetailsAssertions {
        this.assertThat(this.page.smileIconForJobVacancy(jobTitle)).hasCSS("fill", rgbColor);
        return this;
    }

    public assertThatSmileIconForJobVacancyOnCarouselIsEqualTo(jobTitle: string, source: string): RoleDetailsAssertions {
        this.assertThat(this.page.smileIconForJobVacancy(jobTitle)).hasAttribute("src", source);
        return this;
    }

	public assertThatSkillForGivenJobOnCarouselIsEqualTo(jobTitle: string, skill: string): RoleDetailsAssertions {
        this.assertThat(this.page.carouselSkillLabel(jobTitle)).containsText(skill, this.containsTextOptions);;
        return this;
    }

	public assertThatLeftCarouselControlButtonIsDisplayed(): RoleDetailsAssertions {
        this.assertThat(this.page.leftCarouselControlButton).isEnabled();
//        this.page.leftCarouselControlButton().should('be.visible')
        return this;
    }

	public assertThatLeftCarouselControlButtonIsNotDisplayed(): RoleDetailsAssertions {
        this.assertThat(this.page.leftCarouselControlButton).isHidden();
//        this.page.leftCarouselControlButton().should('not.be.visible')
        return this;
    }

	public assertThatRightCarouselControlButtonIsDisplayed(): RoleDetailsAssertions {
        this.assertThat(this.page.rightCarouselControlButton).isVisible(this.isVisibleOptions);
//        this.page.rightCarouselControlButton().should('be.visible')
        return this;
    }

	public assertThatRightCarouselControlButtonIsNotDisplayed(): RoleDetailsAssertions {
        this.assertThat(this.page.rightCarouselControlButton).isHidden();
//        this.page.rightCarouselControlButton().should('not.be.visible')
        return this;
    }

    public assertThatLevelIsEqualTo(level: string): RoleDetailsAssertions {
        this.assertThat(this.page.levelLabel.first()).containsText(level, this.containsTextOptions);
        return this;
    }

    public assertThatCareerPathIconNotExist(): RoleDetailsAssertions {
        this.assertThat(this.page.careerPathIcon).isHidden();
        this.page.logger.info("Successfully verified that path icon doesn't exist.");
        return this;
    }

    public assertThatCareerPathIconExist(): RoleDetailsAssertions {
        this.assertThat(this.page.careerPathIcon).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCareerPathHeaderNotExist(): RoleDetailsAssertions {
        this.assertThat(this.page.careerPathHeader).isHidden();
        this.page.logger.info("Successfully verified that path header doesn't exist.");
        return this;
    }

    public assertThatCareerPathHeaderIsEqualTo(header: string): RoleDetailsAssertions {
        this.assertThat(this.page.careerPathHeader).containsText(header);
        return this;
    }

    public assertThatCareerPathDescriptionIsEqualTo(description: string): RoleDetailsAssertions {
        this.assertThat(this.page.careerPathDescription).containsText(description);
        return this;
    }

    public assertNumberOfTheSkillsUserAlreadyHas(expectedSkillsNumber: number): RoleDetailsAssertions {
        this.assertThat(this.page.relatedSkillsLink).hasText(String.format(DESIRED_SKILLS_BASED_ON_YOUR_PROFILE, expectedSkillsNumber));
        return this;
    }

    public assertMatchingSkillUserLevelIs(skillLabel: string, level: string): RoleDetailsAssertions {
        this.assertThat(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_USER_LEVEL_COLUMN_NUMBER)).hasText(level);
        return this;
    }

    public assertMatchingSkillExpectedLevelIs(skillLabel: string, level: string): RoleDetailsAssertions {
        this.assertThat(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_LEVEL_COLUMN_NUMBER)).hasText(level);
        return this;
    }

    public assertMatchingSkillStatusIs(skillLabel: string, status: string): RoleDetailsAssertions {
        this.assertThat(this.page.matchingSkillColumn(skillLabel, MATCHING_SKILL_STATUS_COLUMN_NUMBER)).hasText(status);
        return this;
    }

    public assertRoleTargetLevelForSkillIs(skillLabel: string, level: string): RoleDetailsAssertions {
        this.assertThat(this.page.learningGoalColumn(skillLabel, ROLE_TARGET_LEVEL_COLUMN_NUMBER).locator("p")).hasText(level);
        return this;
    }
    public assertLearningTargetLevelForSkillIs(skillLabel: string, level: string): RoleDetailsAssertions {
        this.assertThat(this.page.learningGoalColumn(skillLabel, LEARNING_TARGET_LEVEL_COLUMN_NUMBER).locator("//select/option[@selected]")).hasText(level);
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
        this.assertThat(this.page.statusIcon).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatStatusMessageIsEqualTo(status: string): RoleDetailsAssertions {
        this.assertThat(this.page.statusMessage).containsText(status, this.containsTextOptions);
        return this;
    }

    public assertThatStatusMessageDescriptionIsEqualTo(description: string): RoleDetailsAssertions {
        this.assertThat(this.page.statusMessageDescription).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatCustomPillContainsText(description: string): RoleDetailsAssertions {
        this.assertThat(this.page.customPill).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatSubwayViewDescriptionIsEqualTo(description: string): RoleDetailsAssertions {
        this.assertThat(this.page.subwayViewDescription).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatUserRoleNameIsEqualTo(roleName: string): RoleDetailsAssertions {
        this.assertThat(this.page.userRoleName).containsText(roleName, this.containsTextOptions);
        this.page.logger.info("Successfully verified that user role name contains '" + roleName + "' text.");
        return this;
    }

    public assertThatPathIsDisplayed(number: string): RoleDetailsAssertions {
        this.assertThat(this.page.path(number)).isEnabled();
        return this;
    }

    public assertThatRolePositionOnTheGridIsEqualTo(roleName: string, rolePosition: string): RoleDetailsAssertions {
        Assert.assertTrue(this.page.rolePosition(roleName).getAttribute("class").contains(rolePosition));
        return this;
    }

    public assertThatGoalRoleNameIsEqualTo(role: string): RoleDetailsAssertions {
        this.assertThat(this.page.goalRoleName).containsText(role, this.containsTextOptions);
        this.page.logger.info("Successfully verified that goal role name contains '" + role + "' text.");
        return this;
    }

    public assertThatNumberOfPathsIsEqualTo(number: string): RoleDetailsAssertions {
        this.assertThat(this.page.paths).hasCount(Integer.parseInt(number));
        return this;
    }

    public assertThatNumberOfMovesForThePathIsEqualTo(pathNo: string, number: string): RoleDetailsAssertions {
        this.assertThat(this.page.movesForGivenPath(pathNo)).hasCount(Integer.parseInt(number));
        return this;
    }

    public assertThatPathHasParameterForTheMove(pathNo: string, pathNoPlus1: string, stepNo: string, parameter: string): RoleDetailsAssertions {
        this.assertThat(this.page.moveForGivenStep(pathNo, pathNoPlus1, stepNo)).hasAttribute("d", parameter);
        return this;
    }

    public assertThatMoveWithinAPathIsHighlighted(pathNo: string, stepNo: string): RoleDetailsAssertions {
        Assert.assertTrue(this.page.moveByPathAndStep(pathNo, stepNo).getAttribute("class").contains("highlihgted"));
        return this;
    }

    public assertThatPathHasNoHighlightedMoves(pathNo: string): RoleDetailsAssertions {
        this.assertThat(this.page.highlightedMoveForGivenPath(pathNo)).isHidden();
        return this;
    }

    public assertThatNumberOfGridLinesIsEqualTo(number: string): RoleDetailsAssertions {
        this.assertThat(this.page.gridLine).hasCount(Integer.parseInt(number));
        return this;
    }

    public assertThatArrowIconIsDisplayedForPath(pathName: string): RoleDetailsAssertions {
        this.page.pause(2000);
        Assert.assertTrue(this.page.aspirationalIconForPath(pathName).getAttribute("class").contains("icon icon-bullseye-arrow active icon-selected"));
        return this;
    }

    public assertThatArrowIconIsNotDisplayedForPath(pathName: string): RoleDetailsAssertions {
        this.assertThat(this.page.aspirationalIconForPath(pathName)).isHidden();
        return this;
    }

    public assertThatBackgroundColorForARoleIsEqualTo(roleName: string, rgbColor: string): RoleDetailsAssertions {
        this.assertThat(this.page.roleBackgroundColor(roleName)).hasCSS("background-color", rgbColor);
        return this;
    }

    public assertThatRoleSummaryIsDisplayed(roleSummary: string): RoleDetailsAssertions {
        this.assertThat(this.page.descriptionBlock).containsText(roleSummary);
        this.page.logger.info("Successfully verified data Role Summary is displayed");
        return this;
    }

    public assertThatAdditionalDescriptionIsDisplayed(additionalDescription: string): RoleDetailsAssertions {
        this.assertThat(this.page.descriptionBlock).containsText(additionalDescription);
        this.page.logger.info("Successfully verified data Additional Description is displayed");
        return this;
    }

    public assertThatDescriptionIsDisplayed(description: string): RoleDetailsAssertions {
        this.assertThat(this.page.descriptionBlock).containsText(description);
        this.page.logger.info("Successfully verified data Description is displayed");
        return this;
    }

    public assertThatLevelEngagementIsNotDisplayedInDetailsPage(): RoleDetailsAssertions {
        this.assertThat(this.page.roleDetailsLevel.last()).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatLevelEngagementIsDisplayedInDetailsPage(): RoleDetailsAssertions {
        this.assertThat(this.page.roleDetailsLevel.last()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnJobCardDetails(): RoleDetailsAssertions {
        this.assertThat(this.page.jobRoleDetailsLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobCardDetails(): RoleDetailsAssertions {
        this.assertThat(this.page.jobRoleDetailsLocation).isHidden();
        return this;
    }

    public assertThatRoleMessageIsEqualTo(message: string): RoleDetailsAssertions {
        this.assertThat(this.page.roleMessage).containsText(message);
        return this;
    }
}
