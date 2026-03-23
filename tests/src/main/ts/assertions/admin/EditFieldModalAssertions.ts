import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { EditFieldModalPage } from "pages/admin/EditFieldModalPage";

export class EditFieldModalAssertions extends BaseAssertion<EditFieldModalPage> {

    public assertThatAddNewOptionButtonIsNotDisplayed(): EditFieldModalAssertions {
        this.assertThat(this.page.addNewOptionButton).isVisible(this.isVisibleOptions);
//        this.page.addNewOptionButton().should('not.exist')
        return this;
    }

    public assertThatVisibilityButtonIsNotDisplayed(defaultLabel: string): EditFieldModalAssertions {
        this.assertThat(this.page.enableDisableVisibilityButton(defaultLabel)).isVisible(this.isVisibleOptions);
//        this.page.enableDisableVisibilityButton(defaultLabel).should('not.exist')
        return this;
    }

    public assertThatNewLabelIsDisplayed(): EditFieldModalAssertions {
        this.assertThat(this.page.newLabel.last()).isVisible(this.isVisibleOptions);
//        this.page.newLabel().should('exist')
        return this;
    }

    public assertThatUsageAreaIsDisplayed(area: string): EditFieldModalAssertions {
        this.assertThat(this.page.usageAreaRemoveButton(area)).isVisible(this.isVisibleOptions);
//        this.page.usageAreaRemoveButton(area).should('exist')
        return this;
    }

    public assertThatDefaultLabelForFirstElementIsVisible(defaultLabel: string): EditFieldModalAssertions {
        this.assertThat(this.page.firstRowDefaultLabel(defaultLabel)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatKeyForFirstElementIsVisible(key: string): EditFieldModalAssertions {
        this.assertThat(this.page.firstRowKey(key)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFirstElementIsEnable(): EditFieldModalAssertions {
        this.assertThat(this.page.firstRowEnabled).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDefaultLabelForElementByIndexIsContains(index: string, defaultValue: string): EditFieldModalAssertions {
        this.assertThat(this.page.rowDefaultLabel(index)).containsText(defaultValue, this.containsTextOptions);
        return this;
    }

    public assertThatRankOneValueIsTheSame(): EditFieldModalAssertions {
        this.assertThat(this.page.rankValueOne.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRankTwoValueIsTheSame(): EditFieldModalAssertions {
        this.assertThat(this.page.rankValueTwo.first()).isVisible(this.isVisibleOptions);
        return this;
    }
}
