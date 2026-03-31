// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";

export class ManageRoleAssertions extends BaseAssertion<ManageRolePage> {

    public assertThatSubmenuTabIsSelected(subMenuTab: string): ManageRoleAssertions {
        expect(this.page.selectedTab(subMenuTab)).toBeVisible(this.isVisibleOptions);
//        this.page.selectedTab(subMenuTab).should('exist')
        return this;
    }

	public assertThatSubmenuTabIsHighlighted(subMenuTab: string, rgbColor: string): ManageRoleAssertions {
        expect(this.page.selectedTab(subMenuTab)).toHaveCSS("background-color", rgbColor);
//        this.page.selectedTab(subMenuTab).should('have.css', 'background-color').and('eq', rgbColor)
        return this;
    }

	public assertThatNumberOfItemsOnRoleListIs(additionalRoleNumber: number, dismissedRoleNumber: string): ManageRoleAssertions {
        expect(this.page.rolesList).toContainText(String.valueOf(additionalRoleNumber + Integer.parseInt(dismissedRoleNumber)), this.containsTextOptions);
//        cy.get('@dismissedRoleNumber').then((dismissedRoleNumber : any) {
//            this.page.rolesList().should('contain.text', parseInt(dismissedRoleNumber.toString()) + additionalRoleNumber)
//        })
        return this;
    }

	public assertThatItemIsDisplayedOnRoleList(dismissedRoleTitle: string): ManageRoleAssertions {
        expect(this.page.rolesList).toContainText(dismissedRoleTitle, this.containsTextOptions);
//        cy.get('@firstElementOnAllRolesList').then((dismissedRoleTitle: any) {
//            this.page.rolesList().should('contain.text', dismissedRoleTitle)
//        })
        return this;
    }

	public assertThatItemIsNotDisplayedOnRoleList(dismissedRoleTitle: string): ManageRoleAssertions {
        expect(this.page.rolesList).not.toContainText(dismissedRoleTitle, this.containsTextOptions);
//        cy.get('@firstElementOnAllRolesList').then((dismissedRoleTitle: any) {
//            this.page.rolesList().should('not.contain.text', dismissedRoleTitle)
//        })
        return this;
    }

	public assertThatRoleIsDisplayedOnTheList(roleId: string): ManageRoleAssertions {
        expect(this.page.rolesByID(roleId)).toBeVisible(this.isVisibleOptions);
//        this.page.rolesByID(roleId).should('exist')
        return this;
    }

	public assertThatRoleIsNotDisplayedOnTheList(roleId: string): ManageRoleAssertions {
        expect(this.page.rolesByID(roleId)).toBeHidden();
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
        expect(this.page.markedAsAspirationalRoleIdArrowIcon(roleId)).toBeVisible(this.isVisibleOptions);
//        this.page.markedAsAspirationalRoleIdArrowIcon(roleId).should('exist')
        return this;
    }

	public assertThatThereIsNoItemsToShow(information: string): ManageRoleAssertions {
        expect(this.page.noJobVacanciesToShowInfo(information)).toBeVisible(this.isVisibleOptions);
//        this.page.noJobVacanciesToShowInfo(information).should('exist')
        return this;
    }

	public assertThatActionIsNotDisplayed(option: string): ManageRoleAssertions {
        expect(this.page.moreActionsPopperOption(option)).toBeHidden();
//        this.page.moreActionsPopperOption(option).should('not.exist')
        return this;
    }

    public assertMessageText(messageText: string): ManageRoleAssertions {
        expect(this.page.message).toContainText(messageText, this.containsTextOptions);
        return this;
    }

    public assertThatRoleIsPresentOnTheList(): ManageRoleAssertions {
        this.page.firstRoleOnTheList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(this.page.firstRoleOnTheList.isVisible());
        return this;
    }

    public assertThatRoleIsNotPresentOnTheList(message: string): ManageRoleAssertions {
        expect(this.page.searchResults.first()).toContainText(message, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Job role not found on the list.");
        return this;
    }
}
