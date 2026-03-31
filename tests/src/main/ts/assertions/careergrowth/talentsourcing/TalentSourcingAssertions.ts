// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Locator, expect } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TalentSourcingPage } from "pages/careergrowth/talentsourcing/TalentSourcingPage";

export class TalentSourcingAssertions extends BaseAssertion<TalentSourcingPage> {

    public assertThatTalentSourcingIconIsDisplayedInMoreIcon(): TalentSourcingAssertions {
        Assert.assertTrue(this.page.talentSourcingIcon.isVisible());
        return this;
    }

    public assertThatTalentSourcingText(message: string): TalentSourcingAssertions {
        expect(this.page.talentSourcingText).toContainText(message, this.containsTextOptions);
        return this;
    }

    public assertThatJobTitleName(title: string, message: string): TalentSourcingAssertions {
        expect(this.page.jobName(title)).toContainText(message, this.containsTextOptions);
        this.page.logger.info("Verified Job title " + title);
        return this;
    }

    public assertThatOptionsDisplayed(): TalentSourcingAssertions {
        expect(this.page.viewDetails).toBeVisible();
        expect(this.page.manageJobVacancy).toBeVisible();
        return this;
    }

    public assertThatBookmarkAndAppliedTextIsDisplayed(title: string): TalentSourcingAssertions {
        expect(this.page.bookMarksText(title)).toBeVisible();
        expect(this.page.appliedText(title)).toBeVisible();
        return this;
    }

    public assertThatFirstJobVacancyIsDisplayedOnTalentSourcing(): TalentSourcingAssertions {
        //this.page.firstItemOnAllTalentSourcingJobList.count()>0
        let list: Array<Locator> = Collections.singletonList(this.page.firstItemOnAllTalentSourcingJobList);
        //expect(list.length>0).toBeVisible(this.isVisibleOptions.);
        //expect(this.page.firstItemOnAllTalentSourcingJobList).toBeEmpty();
        let value: number = this.page.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        return this;
    }

    public assertThatJobVacancyTitleIsDisplayed(): TalentSourcingAssertions {
        expect(this.page.jobVacancyTitle).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatGenericTitle(value: string): TalentSourcingAssertions {
        expect(this.page.genericTitleHeader(value)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSuggestedTalentTitle(expectedString: string): TalentSourcingAssertions {
        expect(this.page.peopleTitle).toContainText(expectedString, this.containsTextOptions);
        return this;
    }

    public assertThatFirstCandidateFromSuggestedTalent(): TalentSourcingAssertions {
        let list: Array<Locator> = Collections.singletonList(this.page.getFirstCandidateFromSuggestedTalentList);
        Assert.assertTrue(list.length>0);
        return this;
    }

    public assertThatTitlesForCandidateViewDetails(value: string): TalentSourcingAssertions {
        expect(this.page.genericTitleForCandidate(value).first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatValidationMessageIfNoResultFound(message: string, expectedMessage: string): TalentSourcingAssertions {
        expect(this.page.resultNotFoundMessage(message)).toContainText(expectedMessage, this.containsTextOptions);
        return this;
    }

    public assertThatTitleForViewDetails(value: string): TalentSourcingAssertions {
        expect(this.page.genericTitleHeaders(value)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDisplayFilterForJobsIsDisplayed(value: string): TalentSourcingAssertions {
        expect(this.page.displayVacancyFilterValues(value)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatNoVacancyIsDisplayedForClosedVacancy(): TalentSourcingAssertions {
        let count: number = this.page.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(count==1);
        return this;
    }

    public assertThatSuggestedTalentDisplayedForFilter(candidateName: string): TalentSourcingAssertions {
        expect(this.page.suggestedCandidateName(candidateName)).toContainText(candidateName, this.containsTextOptions);
        return this;
    }
}
