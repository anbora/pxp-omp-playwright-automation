import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";

export class ManageObjectiveAssertions extends BaseAssertion<ManageObjectivesPage> {

	public assertThatTableHeaderEquals(expected: string[]): ManageObjectiveAssertions {
		this.assertThat(this.page.objectiveTableHeader).containsText(expected);
        return this;
    }

	public assertThatObjectiveIsVisible(objectiveName: string): ManageObjectiveAssertions {
		this.assertThat(this.page.ObjectiveView(objectiveName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatObjectiveTitleViewPopup(objectiveTitle: string): ManageObjectiveAssertions {
		this.assertThat(this.page.objTitleViewPopup(objectiveTitle)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatObjectiveDescrptionViewPopup(objectiveDescription: string): ManageObjectiveAssertions {
		this.assertThat(this.page.objDescriptionViewPopup(objectiveDescription)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatObjectiveSkillViewPopup(skillName: string): ManageObjectiveAssertions {
		if(skillName.equals("communication")) {
			this.assertThat(this.page.badge_check(skillName)).isVisible(this.extendedIsVisibleOptions);
		}
		else {
			this.assertThat(this.page.objSkillViewPopup(skillName)).isVisible(this.extendedIsVisibleOptions);
		}

        return this;
    }

	public assertThatObjectiveIsNotPresent(ObjectiveName: string): ManageObjectiveAssertions {
		this.assertThat(this.page.ObjectiveView(ObjectiveName)).hasCount(0);
        return this;
    }

	public assertThatNeedInspirationPresent(): ManageObjectiveAssertions {
		this.assertThat(this.page.needInspirations_Text).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNeedInspirationMinimizePresent(): ManageObjectiveAssertions {
		this.assertThat(this.page.needInspirations).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSuccessMessagePresent(objName: string): ManageObjectiveAssertions {
		this.assertThat(this.page.ObjSuccessMessage(objName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): ManageObjectiveAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
