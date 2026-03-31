// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { EditFieldModalPage } from "pages/admin/EditFieldModalPage";
import { expect } from "common/testing/playwright";

export class EditFieldModalAssertions extends BaseAssertion<EditFieldModalPage> {

    public assertThatAddNewOptionButtonIsNotDisplayed(): EditFieldModalAssertions {
        expect(this.page.addNewOptionButton).toBeVisible(this.isVisibleOptions);
//        this.page.addNewOptionButton().should('not.exist')
        return this;
    }

    public assertThatVisibilityButtonIsNotDisplayed(defaultLabel: string): EditFieldModalAssertions {
        expect(this.page.enableDisableVisibilityButton(defaultLabel)).toBeVisible(this.isVisibleOptions);
//        this.page.enableDisableVisibilityButton(defaultLabel).should('not.exist')
        return this;
    }

    public assertThatNewLabelIsDisplayed(): EditFieldModalAssertions {
        expect(this.page.newLabel.last()).toBeVisible(this.isVisibleOptions);
//        this.page.newLabel().should('exist')
        return this;
    }

    public assertThatUsageAreaIsDisplayed(area: string): EditFieldModalAssertions {
        expect(this.page.usageAreaRemoveButton(area)).toBeVisible(this.isVisibleOptions);
//        this.page.usageAreaRemoveButton(area).should('exist')
        return this;
    }

    public assertThatDefaultLabelForFirstElementIsVisible(defaultLabel: string): EditFieldModalAssertions {
        expect(this.page.firstRowDefaultLabel(defaultLabel)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatKeyForFirstElementIsVisible(key: string): EditFieldModalAssertions {
        expect(this.page.firstRowKey(key)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFirstElementIsEnable(): EditFieldModalAssertions {
        expect(this.page.firstRowEnabled).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDefaultLabelForElementByIndexIsContains(index: string, defaultValue: string): EditFieldModalAssertions {
        expect(this.page.rowDefaultLabel(index)).toContainText(defaultValue, this.containsTextOptions);
        return this;
    }

    public assertThatRankOneValueIsTheSame(): EditFieldModalAssertions {
        expect(this.page.rankValueOne.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRankTwoValueIsTheSame(): EditFieldModalAssertions {
        expect(this.page.rankValueTwo.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
