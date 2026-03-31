// @ts-nocheck
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { BasePage } from "common/BasePage";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert, assertEquals, assertTrue } from "common/testing/runtime";
import { ResultContainer } from "models/ResultContainer";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";

export class JobVacancyDetailsAssertions extends BaseAssertion<JobVacancyDetailsPage> {

    private static readonly BEGINNER: number = 1;
    private static readonly INTERMEDIATE: number = 2;
    private static readonly ADVANCED: number = 3;
    public static readonly SKILL_XPATH: string = "//li[@class='job-skill__skills__chip'][text()='%s']";
    public static readonly DESIRED_SKILLS_BASED_ON_YOUR_PROFILE: string = "You have %d out of %d of the desired skills based on your profile";

    public assertThatMatchingIsEqualTo(matching: string): JobVacancyDetailsAssertions {
        expect(this.page.matchingLabel).toContainText(matching, this.containsTextOptions);
//        this.page.matchingLabel().should('contain.text', matching)
        return this;
    }

    public assertThatDescriptionEqualTo(descriptionText: string): JobVacancyDetailsAssertions {
        expect(this.page.description).toContainText(descriptionText, this.containsTextOptions);
//        this.page.description().should('contain.text', descriptionText)
        return this;
    }

    public assertThatTitleEqualTo(title: string): JobVacancyDetailsAssertions {
        expect(this.page.jobTitle).toContainText(title, this.containsTextOptions);
//        this.page.jobTitle().should('contain.text', title)
        return this;
    }

    public assertThatDescriptionHasPlainTextFormatting(): JobVacancyDetailsAssertions {
        expect(this.page.descriptionPlainText).toBeVisible(this.isVisibleOptions);
//        this.page.descriptionPlainText().should('exist')
        return this;
    }

    public assertThatDescriptionHasHtmlFormatting(): JobVacancyDetailsAssertions {
        expect(this.page.descriptionPlainText).toBeHidden();
//        this.page.descriptionPlainText().should('not.exist')
        return this;
    }

    public assertThatDescriptionContainsHeader(descriptionHeaderText: string): JobVacancyDetailsAssertions {
        expect(this.page.descriptionHeader(descriptionHeaderText)).toBeVisible(this.isVisibleOptions);
//        this.page.descriptionHeader(descriptionHeaderText).should('exist')
        return this;
    }

    public assertThatDescriptionContainsStrongText(descriptionStrongText: string): JobVacancyDetailsAssertions {
        expect(this.page.descriptionStrongText(descriptionStrongText)).toBeVisible(this.isVisibleOptions);
//        this.page.descriptionStrongText(descriptionStrongText).should('exist')
        return this;
    }

    public assertThatDescriptionContainsListElement(listText: string): JobVacancyDetailsAssertions {
        expect(this.page.descriptionList(listText)).toBeVisible(this.isVisibleOptions);
//        this.page.descriptionList(listText).should('exist')
        return this;
    }

    public assertThatDescriptionNotContainsListElement(listText: string): JobVacancyDetailsAssertions {
        expect(this.page.descriptionList(listText)).toBeHidden();
//        this.page.descriptionList(listText).should('not.be.visible')
        return this;
    }

    public assertThatJobHasTextInContext(text: string): JobVacancyDetailsAssertions {
        expect(this.page.context(text)).toBeVisible(this.isVisibleOptions);
//        this.page.context(text).should('exist')
        return this;
    }

    public assertThatSkillsMatchingDetailsIsVisible(): JobVacancyDetailsAssertions {
        expect(this.page.skillsMatchDetails).toBeVisible(this.isVisibleOptions);
//        this.page.skillsMatchDetails().should('exist')
        return this;
    }

    public assertThatSkillsMatchLevelOnMatchingDetailsIsEqualTo(title: string): JobVacancyDetailsAssertions {
        expect(this.page.skillsMatchDetailsTitle).toHaveAttribute("title", title);
//        this.page.skillsMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

    public assertThatExperienceMatchingDetailsIsVisible(): JobVacancyDetailsAssertions {
        expect(this.page.experienceMatchDetails).toBeVisible(this.isVisibleOptions);
//        this.page.experienceMatchDetails().should('exist')
        return this;
    }

    public assertThatExperienceMatchLevelOnMatchingDetailsIsEqualTo(title: string): JobVacancyDetailsAssertions {
        expect(this.page.experienceMatchDetailsTitle).toHaveAttribute("title", title);
//        this.page.experienceMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

    public assertThatThereIsGoodMatchIconFor(area: string): JobVacancyDetailsAssertions {
        expect(this.page.matchIcon(area)).toHaveClass("matching-good icon-check-circle-light");
//        this.page.matchIcon(area).should('have', 'matching-good icon-check-circle-light')
        return this;
    }

    public assertThatThereIsBadMatchIconFor(area: string): JobVacancyDetailsAssertions {
        expect(this.page.matchIcon(area)).toHaveClass("matching-bad icon-cross-circle");
//        this.page.matchIcon(area).should('have', 'matching-bad icon-cross-circle')
        return this;
    }

    public assertThatThereIsNeutralMatchIconFor(area: string): JobVacancyDetailsAssertions {
        expect(this.page.matchIcon(area)).toHaveClass("matching-neutral icon-minus-circle");
//        this.page.matchIcon(area).should('have', 'matching-neutral icon-minus-circle')
        return this;
    }

    public assertThatYourRecruiterEqualTo(yourRecruiter: string): JobVacancyDetailsAssertions {
        expect(this.page.yourRecruiter).toContainText(yourRecruiter, this.containsTextOptions);
//        this.page.yourRecruiter().should('contain.text', yourRecruiter)
        return this;
    }

    public assertThatMatchingDetailFieldIsEqualTo(matchingDetailName: string, value: string): JobVacancyDetailsAssertions {
        expect(this.page.matchDetailValue(matchingDetailName)).toContainText(value, this.containsTextOptions);
//        this.page.matchDetailValue(matchingDetailName).should('contain.text', value)
        return this;
    }

    public assertThatVacancyDetailsContainsLocationWithInformationAboutWorkplaceModel(workplaceModel: string): JobVacancyDetailsAssertions {
        expect(this.page.workplaceModelLabel(workplaceModel)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancyHasProperScoringValue(scoringName: string, scoringValue: string): JobVacancyDetailsAssertions {
        this.page.getPage().waitForLoadState();
        expect(this.page.matchingLabel.first()).toContainText(scoringName, this.containsTextOptions);
//        expect(this.page.matchingValue).toContainText(scoringValue, this.containsTextOptions);
//        cy.get('@scoringName').then(scoringName => {
//                this.page.matchingLabel().should('contain.text', scoringName)
//        })
//        cy.get('@scoringValue').then(scoringValue => {
//                this.page.matchingValue().should('have.attr', 'style').and('include', scoringValue)
//        })
        return this;
    }

    public assertThatUrlAttachedToButtonEqualTo(url: string): JobVacancyDetailsAssertions {
        expect(this.page.applyUrlButton(url)).toBeVisible(this.isVisibleOptions);
//        this.page.applyUrlButton(url).should('exist')
        return this;
    }

    public assertThatApplyButtonTextIsCorrect(buttonText: string): JobVacancyDetailsAssertions {
        expect(this.page.applyButtonText).toContainText(buttonText, this.containsTextOptions);
//        this.page.applyButtonText().should('contain.text', buttonText)
        return this;
    }

    public assertJobAppliedInfoIsDisplayed(info: string): JobVacancyDetailsAssertions {
        expect(this.page.jobApplied).toContainText(info, this.containsTextOptions);
//        this.page.jobApplied().should('contain.text', info)
        return this;
    }

    public assertJobAppliedInfoIsNotDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.jobApplied).toBeHidden();
//        this.page.jobApplied().should('not.exist')
        return this;
    }

    public assertThatTooltipTextIsEqualTo(text: string): JobVacancyDetailsAssertions {
        expect(this.page.toolTip).toContainText(text, this.containsTextOptions);
//        this.page.toolTip().should('contain.text', text)
        return this;
    }

    public assertThatSkillChipsIsVisibleOnJobVacancyDetails(skill: string): JobVacancyDetailsAssertions {
        expect(this.page.skillChips(skill).first()).toBeVisible(this.isVisibleOptions);
//        this.page.skillChips(skill).should('exist')
        return this;
    }

    public assertThatEditJobIsNotVisibleOnJobDetails(): JobVacancyDetailsAssertions {
        expect(this.page.threeDotsButton).toBeHidden();
//        this.page.threeDotsButton().should('not.exist')
        return this;
    }

    public assertThatBookmarkIsEnabled(): JobVacancyDetailsAssertions {
        this.page.jobVacancyHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        expect(this.page.bookmarkButton).toBeEnabled();
//        this.page.dismissButton().should('not.be.disabled')
        return this;
    }

    public assertThatBookmarkButtonIsNotDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.bookmarkButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatJobDescriptionFieldContainsHeader(jobDescriptionHeaderField: string): JobVacancyDetailsAssertions {
        this.page.jobDescriptionHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        expect(this.page.jobDescriptionHeader).toContainText(jobDescriptionHeaderField, this.containsTextOptions);
        return this;
    }

    public assertThatJobVacancyFieldContainsHeader(jobVacancyFieldHeader: string): JobVacancyDetailsAssertions {
        this.page.jobVacancyHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        expect(this.page.jobVacancyHeader).toContainText(jobVacancyFieldHeader, this.containsTextOptions);
        return this;
    }

    public assertThatViewAndAddToSkillsPassportButtonIsVisible(): JobVacancyDetailsAssertions {
        expect(this.page.addSkillsToPassportButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAddSkillsToPassportButtonIsVisible(): JobVacancyDetailsAssertions {
        expect(this.page.addSkillsToPassportButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport(userSkills: string): JobVacancyDetailsAssertions {
        expect(this.page.skillsPassportNumberOfSkills(userSkills)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport_SkillLevel(userSkills: string): JobVacancyDetailsAssertions {
        expect(this.page.skillsPassportNumberOfSkills_SkillLevel(userSkills)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCarouselCounterIsEqualTo(counter: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselCounter).toContainText(counter, this.containsTextOptions);
        return this;
    }

	public assertThatTheNumberOfTheJobsOnCarouselIsEqualTo(number: string): JobVacancyDetailsAssertions {
        expect(this.page.jobsOnCarousel).toHaveCount(Integer.parseInt(number));
//        this.page.jobsOnCarousel().should('have.length', number)
        return this;
    }

    public assertThatJobIsNotDisplayedOnCarousel(title: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselJobTitle(title)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

	public assertThatThereIsJobTitleOnCarousel(title: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselJobTitle(title)).toBeVisible(this.isVisibleOptions);
//        this.page.carouselJobTitle(title).should('exist')
        return this;
    }

	public assertThatLocationForGivenJobOnCarouselIsEqualTo(jobTitle: string, location: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselJobLocationLabel(jobTitle)).toContainText(location, this.containsTextOptions);
//        this.page.carouselJobLocationLabel(jobTitle).should('contain.text', location)
        return this;
    }

	public assertThatTypeForGivenJobOnCarouselIsEqualTo(jobTitle: string, jobType: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselJobTypeLabel(jobTitle)).toContainText(jobType, this.containsTextOptions);
//        this.page.carouselJobTypeLabel(jobTitle).should('contain.text', jobType)
        return this;
    }

	public assertThatMatchForGivenJobOnCarouselIsEqualTo(jobTitle: string, match: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselJobMatchLabel(jobTitle)).toContainText(match, this.containsTextOptions);
//        this.page.carouselJobMatchLabel(jobTitle).should('contain.text', match)
        return this;
    }

    public assertThatMatchIconForGivenJobOnCarouselIsEqualTo(jobTitle: string, rgbColor: string): JobVacancyDetailsAssertions {
        expect(this.page.smileIconForJobVacancy(jobTitle)).toHaveCSS("fill", rgbColor);
        return this;
    }

	public assertThatSkillForGivenJobOnCarouselIsEqualTo(jobTitle: string, skill: string): JobVacancyDetailsAssertions {
        expect(this.page.carouselSkillLabel(jobTitle, skill)).toBeVisible(this.isVisibleOptions);
//        this.page.carouselSkillLabel(jobTitle, skill).should('exist')
        return this;
    }

    public assertThatLeftCarouselControlButtonIsDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.leftCarouselControlButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLeftCarouselControlButtonIsNotDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.leftCarouselControlButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

	public assertThatRightCarouselControlButtonIsDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.rightCarouselControlButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatRightCarouselControlButtonIsNotDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.rightCarouselControlButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatAlertForSimilarJobsRadiobuttonExist(): JobVacancyDetailsAssertions {
        expect(this.page.alertForSimilarJobsRadiobutton).toBeVisible(this.isVisibleOptions);
//        this.page.alertForSimilarJobsRadiobutton().should('exist')
        return this;
    }

    public assertThatSimilarJobIsMarkedAsBookmarked(jobTitle: string): JobVacancyDetailsAssertions {
        expect(this.page.bookmarkedButtonForSimilarJob(jobTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.bookmarkedButtonForSimilarJob(jobTitle).should('exist')
        return this;
    }

    public assertThatBookmarkSimilarJobButtonIsNotDisplayed(jobTitle: string): JobVacancyDetailsAssertions {
        expect(this.page.bookmarkButtonForSimilarJob(jobTitle)).not.toBeVisible(this.isNotVisibleOptions);
//        this.page.bookmarkButtonForSimilarJob(jobTitle).should('not.exist')
        return this;
    }

    public assertThatSimilarJobIsMarkedAsDismissed(jobTitle: string): JobVacancyDetailsAssertions {
        expect(this.page.dismissedButtonForSimilarJob(jobTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.dismissedButtonForSimilarJob(jobTitle).should('exist')
        return this;
    }

    public assertThatDismissSimilarJobButtonIsNotDisplayed(jobTitle: string): JobVacancyDetailsAssertions {
        expect(this.page.dismissButtonForSimilarJob(jobTitle)).not.toBeVisible(this.isNotVisibleOptions);
//        this.page.dismissButtonForSimilarJob(jobTitle).should('not.exist')
        return this;
    }

    public assertThatViewAllLinkIsNotDisplayed(): JobVacancyDetailsAssertions {
        expect(this.page.viewAllLink).not.toBeVisible(this.isNotVisibleOptions);
//        this.page.viewAllLink().should('not.exist')
        return this;
    }

    public assertSkillsOfIndicatedLevelContains(skillsLevel: string, expectedSkills: Set<string>): JobVacancyDetailsAssertions {
        this.assertTrue(this.page.getSkillsOfLevel(skillsLevel).containsAll(expectedSkills));
        return this;
    }

    public assertSkillsOfIndicatedLevelHaveAtLeast(skillsLevel: string, expectedSkillsNumber: number): JobVacancyDetailsAssertions {
        this.assertTrue(this.page.getSkillsOfLevel(skillsLevel).length>= expectedSkillsNumber);
        return this;
    }
    public assertSkillsOfIndicatedLevelHavePrecisely(skillsLevel: string, expectedSkillsNumber: number): JobVacancyDetailsAssertions {
        this.assertEquals(this.page.getSkillsOfLevel(skillsLevel).length, expectedSkillsNumber);
        return this;
    }

    public assertThereAreNoSkillsOfLevel(skillsLevel: string): JobVacancyDetailsAssertions {
        this.assertEquals(this.page.getSkillsOfLevel(skillsLevel).stream().findFirst().get(), "No skills");
        return this;
    }

    public assertThatSkillIsAddedAsBeginnerOne(skillValue: string): JobVacancyDetailsAssertions {
        expect(this.page.skillContainer(BEGINNER).locator(String.format(SKILL_XPATH, skillValue))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsIntermediateOne(skillValue: string): JobVacancyDetailsAssertions {
        expect(this.page.skillContainer(INTERMEDIATE).locator(String.format(SKILL_XPATH, skillValue))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsAdvancedOne(skillValue: string): JobVacancyDetailsAssertions {
        expect(this.page.skillContainer(ADVANCED).locator(String.format(SKILL_XPATH, skillValue))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedToLevel(skillName: string, level: string): JobVacancyDetailsAssertions {
        expect(this.page.skillContainer(level).locator(String.format("//li[text()='%s']", skillName))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAdded(skillName: string): JobVacancyDetailsAssertions {
        Assert.assertTrue(this.page.getAllSkills().allInnerTexts().contains(skillName));
        return this;
    }

    public assertNumberOfTheSkillsUserAlreadyHas(userExpectedSkillsNumber: number, totalSkillsNumberContainer: ResultContainer): JobVacancyDetailsAssertions {
        expect(this.page.relatedSkillsLink).toContainText(String.format(DESIRED_SKILLS_BASED_ON_YOUR_PROFILE, userExpectedSkillsNumber, Integer.parseInt(totalSkillsNumberContainer.getValue())));
        return this;
    }

    public assertThereAreNoLevels(): JobVacancyDetailsAssertions {
        expect(this.page.proficiencyLevels).toHaveCount(0);
        return this;
    }

    public assertPresenceOfSkills(skillsContainer: ResultContainer): JobVacancyDetailsAssertions {
        Assert.assertTrue(Integer.parseInt(skillsContainer.getValue()) > 0);
        return this;
    }

    public assertSkillsOfIndicatedLevelHaveAtMost(skillsLevel: string, expectedSkillsNumber: number): JobVacancyDetailsAssertions {
        this.assertTrue(this.page.getSkillsOfLevel(skillsLevel).length< expectedSkillsNumber);
        return this;
    }
}
