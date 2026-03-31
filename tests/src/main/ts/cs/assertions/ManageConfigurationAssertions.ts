// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ManageConfigurationPage } from "cs/pages/ManageConfigurationPage";
import { expect } from "common/testing/playwright";

export class ManageConfigurationAssertions extends BaseAssertion<ManageConfigurationPage>{

	public assertThatTabsVisible(message: string): ManageConfigurationAssertions {
        expect(this.page.buttonUsingText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatTableHeaders(headers: string[]): ManageConfigurationAssertions {
        expect(this.page.tableHeaders).toContainText(headers);
        return this;
    }

	public assertThatDialogViewCourseButton(expectedButton: string): ManageConfigurationAssertions {
        expect(this.page.buttonUsingText(expectedButton)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCourseTilePresent(expectedButton: string): ManageConfigurationAssertions {
        expect(this.page.courseTitleCourseDetailsPage(expectedButton)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatDurationPresent(duration: string): ManageConfigurationAssertions {
        expect(this.page.CourseDetailsPage_Duration(duration)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatContentPartnerPresent(partner: string): ManageConfigurationAssertions {
        expect(this.page.courseDetailsPage_contentPartner(partner)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNoContentMessagePresent(): ManageConfigurationAssertions {
        expect(this.page.noContentmessage).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatPartOfCountPresent(course: string, column: string, count: string): ManageConfigurationAssertions {
		let newcount: number = Integer.parseInt(count)+1;
        expect(this.page.tableData(course, column)).toHaveText(String.valueOf(newcount));
        return this;
    }

	public assertThatBadgeIsVisible(badge: string): ManageConfigurationAssertions {
		expect(this.page.badge_check(badge)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): ManageConfigurationAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
