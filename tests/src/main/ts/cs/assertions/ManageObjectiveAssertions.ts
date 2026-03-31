// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { expect } from "common/testing/playwright";

export class ManageObjectiveAssertions extends BaseAssertion<ManageObjectivesPage> {

	public assertThatTableHeaderEquals(expected: string[]): ManageObjectiveAssertions {
		expect(this.page.objectiveTableHeader).toContainText(expected);
        return this;
    }

	public assertThatObjectiveIsVisible(objectiveName: string): ManageObjectiveAssertions {
		expect(this.page.ObjectiveView(objectiveName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatObjectiveTitleViewPopup(objectiveTitle: string): ManageObjectiveAssertions {
		expect(this.page.objTitleViewPopup(objectiveTitle)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatObjectiveDescrptionViewPopup(objectiveDescription: string): ManageObjectiveAssertions {
		expect(this.page.objDescriptionViewPopup(objectiveDescription)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatObjectiveSkillViewPopup(skillName: string): ManageObjectiveAssertions {
		if(skillName.equals("communication")) {
			expect(this.page.badge_check(skillName)).toBeVisible(this.extendedIsVisibleOptions);
		}
		else {
			expect(this.page.objSkillViewPopup(skillName)).toBeVisible(this.extendedIsVisibleOptions);
		}

        return this;
    }

	public assertThatObjectiveIsNotPresent(ObjectiveName: string): ManageObjectiveAssertions {
		expect(this.page.ObjectiveView(ObjectiveName)).toHaveCount(0);
        return this;
    }

	public assertThatNeedInspirationPresent(): ManageObjectiveAssertions {
		expect(this.page.needInspirations_Text).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNeedInspirationMinimizePresent(): ManageObjectiveAssertions {
		expect(this.page.needInspirations).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSuccessMessagePresent(objName: string): ManageObjectiveAssertions {
		expect(this.page.ObjSuccessMessage(objName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): ManageObjectiveAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
