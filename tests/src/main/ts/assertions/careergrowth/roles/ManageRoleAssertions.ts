import { BaseAssertion } from "common/BaseAssertion";
import { Locator, WaitForSelectorState } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";

export class ManageRoleAssertions extends BaseAssertion<ManageRolePage> {

    public assertThatSubmenuTabIsSelected(subMenuTab: string): ManageRoleAssertions {
        this.assertThat(this.page.selectedTab(subMenuTab)).isVisible(this.isVisibleOptions);
//        this.page.selectedTab(subMenuTab).should('exist')
        return this;
    }

	public assertThatSubmenuTabIsHighlighted(subMenuTab: string, rgbColor: string): ManageRoleAssertions {
        this.assertThat(this.page.selectedTab(subMenuTab)).hasCSS("background-color", rgbColor);
//        this.page.selectedTab(subMenuTab).should('have.css', 'background-color').and('eq', rgbColor)
        return this;
    }

	public assertThatNumberOfItemsOnRoleListIs(additionalRoleNumber: number, dismissedRoleNumber: string): ManageRoleAssertions {
        this.assertThat(this.page.rolesList).containsText(String.valueOf(additionalRoleNumber + Integer.parseInt(dismissedRoleNumber)), this.containsTextOptions);
//        cy.get('@dismissedRoleNumber').then((dismissedRoleNumber : any) {
//            this.page.rolesList().should('contain.text', parseInt(dismissedRoleNumber.toString()) + additionalRoleNumber)
//        })
        return this;
    }

	public assertThatItemIsDisplayedOnRoleList(dismissedRoleTitle: string): ManageRoleAssertions {
        this.assertThat(this.page.rolesList).containsText(dismissedRoleTitle, this.containsTextOptions);
//        cy.get('@firstElementOnAllRolesList').then((dismissedRoleTitle: any) {
//            this.page.rolesList().should('contain.text', dismissedRoleTitle)
//        })
        return this;
    }

	public assertThatItemIsNotDisplayedOnRoleList(dismissedRoleTitle: string): ManageRoleAssertions {
        this.assertThat(this.page.rolesList).not().not().containsText(dismissedRoleTitle, this.containsTextOptions);
//        cy.get('@firstElementOnAllRolesList').then((dismissedRoleTitle: any) {
//            this.page.rolesList().should('not.contain.text', dismissedRoleTitle)
//        })
        return this;
    }

	public assertThatRoleIsDisplayedOnTheList(roleId: string): ManageRoleAssertions {
        this.assertThat(this.page.rolesByID(roleId)).isVisible(this.isVisibleOptions);
//        this.page.rolesByID(roleId).should('exist')
        return this;
    }

	public assertThatRoleIsNotDisplayedOnTheList(roleId: string): ManageRoleAssertions {
        this.assertThat(this.page.rolesByID(roleId)).isHidden();
//        this.page.rolesByID(roleId).should('not.exist')
        return this;
    }

	public assertThatRoleIsMarkedAsDismissed(roleId: string): ManageRoleAssertions {
        this.page.getPage().waitForLoadState();
        Assert.assertTrue(this.page.roleMarkedAsDismissed(roleId).getAttribute("class").contains("social-activity-btn--red-active"));
//        this.page.roleMarkedAsDismissed(roleId).should('have', 'social-activity-btn--red-active')
        return this;
    }

	public assertThatRoleIsNotMarkedAsDismissed(roleId: string): ManageRoleAssertions {
        this.page.getPage().waitForLoadState();
        Assert.assertTrue(this.page.roleMarkedAsDismissed(roleId).getAttribute("class").contains("social-activity-btn--red"));
//        this.page.roleMarkedAsDismissed(roleId).should('have', 'social-activity-btn--red')
        return this;
    }

	public assertThatRoleIsMarkedAsAspirational(roleId: string): ManageRoleAssertions {
        this.assertThat(this.page.markedAsAspirationalRoleIdArrowIcon(roleId)).isVisible(this.isVisibleOptions);
//        this.page.markedAsAspirationalRoleIdArrowIcon(roleId).should('exist')
        return this;
    }

	public assertThatThereIsNoItemsToShow(information: string): ManageRoleAssertions {
        this.assertThat(this.page.noJobVacanciesToShowInfo(information)).isVisible(this.isVisibleOptions);
//        this.page.noJobVacanciesToShowInfo(information).should('exist')
        return this;
    }

	public assertThatActionIsNotDisplayed(option: string): ManageRoleAssertions {
        this.assertThat(this.page.moreActionsPopperOption(option)).isHidden();
//        this.page.moreActionsPopperOption(option).should('not.exist')
        return this;
    }

    public assertMessageText(messageText: string): ManageRoleAssertions {
        this.assertThat(this.page.message).containsText(messageText, this.containsTextOptions);
        return this;
    }

    public assertThatRoleIsPresentOnTheList(): ManageRoleAssertions {
        this.page.firstRoleOnTheList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(this.page.firstRoleOnTheList.isVisible());
        return this;
    }

    public assertThatRoleIsNotPresentOnTheList(message: string): ManageRoleAssertions {
        this.assertThat(this.page.searchResults.first()).containsText(message, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job role not found on the list.");
        return this;
    }
}
