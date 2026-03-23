import { BaseAssertion } from "common/BaseAssertion";
import { Locator } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { TalentSourcingPage } from "pages/careergrowth/talentsourcing/TalentSourcingPage";

export class TalentSourcingAssertions extends BaseAssertion<TalentSourcingPage> {

    public assertThatTalentSourcingIconIsDisplayedInMoreIcon(): TalentSourcingAssertions {
        Assert.assertTrue(this.page.talentSourcingIcon.isVisible());
        return this;
    }

    public assertThatTalentSourcingText(message: string): TalentSourcingAssertions {
        this.assertThat(this.page.talentSourcingText).containsText(message, this.containsTextOptions);
        return this;
    }

    public assertThatJobTitleName(title: string, message: string): TalentSourcingAssertions {
        this.assertThat(this.page.jobName(title)).containsText(message, this.containsTextOptions);
        this.page.logger.info("Verified Job title " + title);
        return this;
    }

    public assertThatOptionsDisplayed(): TalentSourcingAssertions {
        this.assertThat(this.page.viewDetails).isVisible();
        this.assertThat(this.page.manageJobVacancy).isVisible();
        return this;
    }

    public assertThatBookmarkAndAppliedTextIsDisplayed(title: string): TalentSourcingAssertions {
        this.assertThat(this.page.bookMarksText(title)).isVisible();
        this.assertThat(this.page.appliedText(title)).isVisible();
        return this;
    }

    public assertThatFirstJobVacancyIsDisplayedOnTalentSourcing(): TalentSourcingAssertions {
        //this.page.firstItemOnAllTalentSourcingJobList.count()>0
        let list: Array<Locator> = Collections.singletonList(this.page.firstItemOnAllTalentSourcingJobList);
        //assertThat(list.length>0).isVisible(this.isVisibleOptions.);
        //assertThat(this.page.firstItemOnAllTalentSourcingJobList).isEmpty();
        let value: number = this.page.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        return this;
    }

    public assertThatJobVacancyTitleIsDisplayed(): TalentSourcingAssertions {
        this.assertThat(this.page.jobVacancyTitle).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatGenericTitle(value: string): TalentSourcingAssertions {
        this.assertThat(this.page.genericTitleHeader(value)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSuggestedTalentTitle(expectedString: string): TalentSourcingAssertions {
        this.assertThat(this.page.peopleTitle).containsText(expectedString, this.containsTextOptions);
        return this;
    }

    public assertThatFirstCandidateFromSuggestedTalent(): TalentSourcingAssertions {
        let list: Array<Locator> = Collections.singletonList(this.page.getFirstCandidateFromSuggestedTalentList);
        Assert.assertTrue(list.length>0);
        return this;
    }

    public assertThatTitlesForCandidateViewDetails(value: string): TalentSourcingAssertions {
        this.assertThat(this.page.genericTitleForCandidate(value).first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatValidationMessageIfNoResultFound(message: string, expectedMessage: string): TalentSourcingAssertions {
        this.assertThat(this.page.resultNotFoundMessage(message)).containsText(expectedMessage, this.containsTextOptions);
        return this;
    }

    public assertThatTitleForViewDetails(value: string): TalentSourcingAssertions {
        this.assertThat(this.page.genericTitleHeaders(value)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDisplayFilterForJobsIsDisplayed(value: string): TalentSourcingAssertions {
        this.assertThat(this.page.displayVacancyFilterValues(value)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNoVacancyIsDisplayedForClosedVacancy(): TalentSourcingAssertions {
        let count: number = this.page.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(count==1);
        return this;
    }

    public assertThatSuggestedTalentDisplayedForFilter(candidateName: string): TalentSourcingAssertions {
        this.assertThat(this.page.suggestedCandidateName(candidateName)).containsText(candidateName, this.containsTextOptions);
        return this;
    }
}
