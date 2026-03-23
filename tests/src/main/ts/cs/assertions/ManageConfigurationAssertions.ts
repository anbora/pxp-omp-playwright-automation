import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ManageConfigurationPage } from "cs/pages/ManageConfigurationPage";

export class ManageConfigurationAssertions extends BaseAssertion<ManageConfigurationPage>{

	public assertThatTabsVisible(message: string): ManageConfigurationAssertions {
        this.assertThat(this.page.buttonUsingText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatTableHeaders(headers: string[]): ManageConfigurationAssertions {
        this.assertThat(this.page.tableHeaders).containsText(headers);
        return this;
    }

	public assertThatDialogViewCourseButton(expectedButton: string): ManageConfigurationAssertions {
        this.assertThat(this.page.buttonUsingText(expectedButton)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCourseTilePresent(expectedButton: string): ManageConfigurationAssertions {
        this.assertThat(this.page.courseTitleCourseDetailsPage(expectedButton)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatDurationPresent(duration: string): ManageConfigurationAssertions {
        this.assertThat(this.page.CourseDetailsPage_Duration(duration)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatContentPartnerPresent(partner: string): ManageConfigurationAssertions {
        this.assertThat(this.page.courseDetailsPage_contentPartner(partner)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNoContentMessagePresent(): ManageConfigurationAssertions {
        this.assertThat(this.page.noContentmessage).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatPartOfCountPresent(course: string, column: string, count: string): ManageConfigurationAssertions {
		let newcount: number = Integer.parseInt(count)+1;
        this.assertThat(this.page.tableData(course, column)).hasText(String.valueOf(newcount));
        return this;
    }

	public assertThatBadgeIsVisible(badge: string): ManageConfigurationAssertions {
		this.assertThat(this.page.badge_check(badge)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): ManageConfigurationAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
