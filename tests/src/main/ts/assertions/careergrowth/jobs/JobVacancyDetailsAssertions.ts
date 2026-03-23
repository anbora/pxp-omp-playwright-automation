import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { BasePage } from "common/BasePage";
import { Locator, WaitForSelectorState } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
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
        this.assertThat(this.page.matchingLabel).containsText(matching, this.containsTextOptions);
//        this.page.matchingLabel().should('contain.text', matching)
        return this;
    }

    public assertThatDescriptionEqualTo(descriptionText: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.description).containsText(descriptionText, this.containsTextOptions);
//        this.page.description().should('contain.text', descriptionText)
        return this;
    }

    public assertThatTitleEqualTo(title: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.jobTitle).containsText(title, this.containsTextOptions);
//        this.page.jobTitle().should('contain.text', title)
        return this;
    }

    public assertThatDescriptionHasPlainTextFormatting(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.descriptionPlainText).isVisible(this.isVisibleOptions);
//        this.page.descriptionPlainText().should('exist')
        return this;
    }

    public assertThatDescriptionHasHtmlFormatting(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.descriptionPlainText).isHidden();
//        this.page.descriptionPlainText().should('not.exist')
        return this;
    }

    public assertThatDescriptionContainsHeader(descriptionHeaderText: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.descriptionHeader(descriptionHeaderText)).isVisible(this.isVisibleOptions);
//        this.page.descriptionHeader(descriptionHeaderText).should('exist')
        return this;
    }

    public assertThatDescriptionContainsStrongText(descriptionStrongText: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.descriptionStrongText(descriptionStrongText)).isVisible(this.isVisibleOptions);
//        this.page.descriptionStrongText(descriptionStrongText).should('exist')
        return this;
    }

    public assertThatDescriptionContainsListElement(listText: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.descriptionList(listText)).isVisible(this.isVisibleOptions);
//        this.page.descriptionList(listText).should('exist')
        return this;
    }

    public assertThatDescriptionNotContainsListElement(listText: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.descriptionList(listText)).isHidden();
//        this.page.descriptionList(listText).should('not.be.visible')
        return this;
    }

    public assertThatJobHasTextInContext(text: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.context(text)).isVisible(this.isVisibleOptions);
//        this.page.context(text).should('exist')
        return this;
    }

    public assertThatSkillsMatchingDetailsIsVisible(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillsMatchDetails).isVisible(this.isVisibleOptions);
//        this.page.skillsMatchDetails().should('exist')
        return this;
    }

    public assertThatSkillsMatchLevelOnMatchingDetailsIsEqualTo(title: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillsMatchDetailsTitle).hasAttribute("title", title);
//        this.page.skillsMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

    public assertThatExperienceMatchingDetailsIsVisible(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.experienceMatchDetails).isVisible(this.isVisibleOptions);
//        this.page.experienceMatchDetails().should('exist')
        return this;
    }

    public assertThatExperienceMatchLevelOnMatchingDetailsIsEqualTo(title: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.experienceMatchDetailsTitle).hasAttribute("title", title);
//        this.page.experienceMatchDetailsTitle().should('have.attr', 'title').and('include', title)
        return this;
    }

    public assertThatThereIsGoodMatchIconFor(area: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.matchIcon(area)).hasClass("matching-good icon-check-circle-light");
//        this.page.matchIcon(area).should('have', 'matching-good icon-check-circle-light')
        return this;
    }

    public assertThatThereIsBadMatchIconFor(area: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.matchIcon(area)).hasClass("matching-bad icon-cross-circle");
//        this.page.matchIcon(area).should('have', 'matching-bad icon-cross-circle')
        return this;
    }

    public assertThatThereIsNeutralMatchIconFor(area: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.matchIcon(area)).hasClass("matching-neutral icon-minus-circle");
//        this.page.matchIcon(area).should('have', 'matching-neutral icon-minus-circle')
        return this;
    }

    public assertThatYourRecruiterEqualTo(yourRecruiter: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.yourRecruiter).containsText(yourRecruiter, this.containsTextOptions);
//        this.page.yourRecruiter().should('contain.text', yourRecruiter)
        return this;
    }

    public assertThatMatchingDetailFieldIsEqualTo(matchingDetailName: string, value: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.matchDetailValue(matchingDetailName)).containsText(value, this.containsTextOptions);
//        this.page.matchDetailValue(matchingDetailName).should('contain.text', value)
        return this;
    }

    public assertThatVacancyDetailsContainsLocationWithInformationAboutWorkplaceModel(workplaceModel: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.workplaceModelLabel(workplaceModel)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancyHasProperScoringValue(scoringName: string, scoringValue: string): JobVacancyDetailsAssertions {
        this.page.getPage().waitForLoadState();
        this.assertThat(this.page.matchingLabel.first()).containsText(scoringName, this.containsTextOptions);
//        assertThat(this.page.matchingValue).containsText(scoringValue, this.containsTextOptions);
//        cy.get('@scoringName').then(scoringName => {
//                this.page.matchingLabel().should('contain.text', scoringName)
//        })
//        cy.get('@scoringValue').then(scoringValue => {
//                this.page.matchingValue().should('have.attr', 'style').and('include', scoringValue)
//        })
        return this;
    }

    public assertThatUrlAttachedToButtonEqualTo(url: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.applyUrlButton(url)).isVisible(this.isVisibleOptions);
//        this.page.applyUrlButton(url).should('exist')
        return this;
    }

    public assertThatApplyButtonTextIsCorrect(buttonText: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.applyButtonText).containsText(buttonText, this.containsTextOptions);
//        this.page.applyButtonText().should('contain.text', buttonText)
        return this;
    }

    public assertJobAppliedInfoIsDisplayed(info: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.jobApplied).containsText(info, this.containsTextOptions);
//        this.page.jobApplied().should('contain.text', info)
        return this;
    }

    public assertJobAppliedInfoIsNotDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.jobApplied).isHidden();
//        this.page.jobApplied().should('not.exist')
        return this;
    }

    public assertThatTooltipTextIsEqualTo(text: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.toolTip).containsText(text, this.containsTextOptions);
//        this.page.toolTip().should('contain.text', text)
        return this;
    }

    public assertThatSkillChipsIsVisibleOnJobVacancyDetails(skill: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillChips(skill).first()).isVisible(this.isVisibleOptions);
//        this.page.skillChips(skill).should('exist')
        return this;
    }

    public assertThatEditJobIsNotVisibleOnJobDetails(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.threeDotsButton).isHidden();
//        this.page.threeDotsButton().should('not.exist')
        return this;
    }

    public assertThatBookmarkIsEnabled(): JobVacancyDetailsAssertions {
        this.page.jobVacancyHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.assertThat(this.page.bookmarkButton).isEnabled();
//        this.page.dismissButton().should('not.be.disabled')
        return this;
    }

    public assertThatBookmarkButtonIsNotDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.bookmarkButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatJobDescriptionFieldContainsHeader(jobDescriptionHeaderField: string): JobVacancyDetailsAssertions {
        this.page.jobDescriptionHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.assertThat(this.page.jobDescriptionHeader).containsText(jobDescriptionHeaderField, this.containsTextOptions);
        return this;
    }

    public assertThatJobVacancyFieldContainsHeader(jobVacancyFieldHeader: string): JobVacancyDetailsAssertions {
        this.page.jobVacancyHeader.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.assertThat(this.page.jobVacancyHeader).containsText(jobVacancyFieldHeader, this.containsTextOptions);
        return this;
    }

    public assertThatViewAndAddToSkillsPassportButtonIsVisible(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.addSkillsToPassportButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAddSkillsToPassportButtonIsVisible(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.addSkillsToPassportButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport(userSkills: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillsPassportNumberOfSkills(userSkills)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport_SkillLevel(userSkills: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillsPassportNumberOfSkills_SkillLevel(userSkills)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCarouselCounterIsEqualTo(counter: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselCounter).containsText(counter, this.containsTextOptions);
        return this;
    }

	public assertThatTheNumberOfTheJobsOnCarouselIsEqualTo(number: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.jobsOnCarousel).hasCount(Integer.parseInt(number));
//        this.page.jobsOnCarousel().should('have.length', number)
        return this;
    }

    public assertThatJobIsNotDisplayedOnCarousel(title: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselJobTitle(title)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

	public assertThatThereIsJobTitleOnCarousel(title: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselJobTitle(title)).isVisible(this.isVisibleOptions);
//        this.page.carouselJobTitle(title).should('exist')
        return this;
    }

	public assertThatLocationForGivenJobOnCarouselIsEqualTo(jobTitle: string, location: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselJobLocationLabel(jobTitle)).containsText(location, this.containsTextOptions);
//        this.page.carouselJobLocationLabel(jobTitle).should('contain.text', location)
        return this;
    }

	public assertThatTypeForGivenJobOnCarouselIsEqualTo(jobTitle: string, jobType: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselJobTypeLabel(jobTitle)).containsText(jobType, this.containsTextOptions);
//        this.page.carouselJobTypeLabel(jobTitle).should('contain.text', jobType)
        return this;
    }

	public assertThatMatchForGivenJobOnCarouselIsEqualTo(jobTitle: string, match: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselJobMatchLabel(jobTitle)).containsText(match, this.containsTextOptions);
//        this.page.carouselJobMatchLabel(jobTitle).should('contain.text', match)
        return this;
    }

    public assertThatMatchIconForGivenJobOnCarouselIsEqualTo(jobTitle: string, rgbColor: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.smileIconForJobVacancy(jobTitle)).hasCSS("fill", rgbColor);
        return this;
    }

	public assertThatSkillForGivenJobOnCarouselIsEqualTo(jobTitle: string, skill: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.carouselSkillLabel(jobTitle, skill)).isVisible(this.isVisibleOptions);
//        this.page.carouselSkillLabel(jobTitle, skill).should('exist')
        return this;
    }

    public assertThatLeftCarouselControlButtonIsDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.leftCarouselControlButton).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLeftCarouselControlButtonIsNotDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.leftCarouselControlButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

	public assertThatRightCarouselControlButtonIsDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.rightCarouselControlButton).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatRightCarouselControlButtonIsNotDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.rightCarouselControlButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertThatAlertForSimilarJobsRadiobuttonExist(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.alertForSimilarJobsRadiobutton).isVisible(this.isVisibleOptions);
//        this.page.alertForSimilarJobsRadiobutton().should('exist')
        return this;
    }

    public assertThatSimilarJobIsMarkedAsBookmarked(jobTitle: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.bookmarkedButtonForSimilarJob(jobTitle)).isVisible(this.isVisibleOptions);
//        this.page.bookmarkedButtonForSimilarJob(jobTitle).should('exist')
        return this;
    }

    public assertThatBookmarkSimilarJobButtonIsNotDisplayed(jobTitle: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.bookmarkButtonForSimilarJob(jobTitle)).not().isVisible(this.isNotVisibleOptions);
//        this.page.bookmarkButtonForSimilarJob(jobTitle).should('not.exist')
        return this;
    }

    public assertThatSimilarJobIsMarkedAsDismissed(jobTitle: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.dismissedButtonForSimilarJob(jobTitle)).isVisible(this.isVisibleOptions);
//        this.page.dismissedButtonForSimilarJob(jobTitle).should('exist')
        return this;
    }

    public assertThatDismissSimilarJobButtonIsNotDisplayed(jobTitle: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.dismissButtonForSimilarJob(jobTitle)).not().isVisible(this.isNotVisibleOptions);
//        this.page.dismissButtonForSimilarJob(jobTitle).should('not.exist')
        return this;
    }

    public assertThatViewAllLinkIsNotDisplayed(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.viewAllLink).not().isVisible(this.isNotVisibleOptions);
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
        this.assertThat(this.page.skillContainer(BEGINNER).locator(String.format(SKILL_XPATH, skillValue))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsIntermediateOne(skillValue: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillContainer(INTERMEDIATE).locator(String.format(SKILL_XPATH, skillValue))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsAdvancedOne(skillValue: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillContainer(ADVANCED).locator(String.format(SKILL_XPATH, skillValue))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedToLevel(skillName: string, level: string): JobVacancyDetailsAssertions {
        this.assertThat(this.page.skillContainer(level).locator(String.format("//li[text()='%s']", skillName))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAdded(skillName: string): JobVacancyDetailsAssertions {
        Assert.assertTrue(this.page.getAllSkills().allInnerTexts().contains(skillName));
        return this;
    }

    public assertNumberOfTheSkillsUserAlreadyHas(userExpectedSkillsNumber: number, totalSkillsNumberContainer: ResultContainer): JobVacancyDetailsAssertions {
        this.assertThat(this.page.relatedSkillsLink).containsText(String.format(DESIRED_SKILLS_BASED_ON_YOUR_PROFILE, userExpectedSkillsNumber, Integer.parseInt(totalSkillsNumberContainer.getValue())));
        return this;
    }

    public assertThereAreNoLevels(): JobVacancyDetailsAssertions {
        this.assertThat(this.page.proficiencyLevels).hasCount(0);
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
