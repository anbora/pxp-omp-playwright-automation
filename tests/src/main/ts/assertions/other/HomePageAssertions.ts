// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { HomePage } from "pages/other/HomePage";
import { expect } from "common/testing/playwright";

export class HomePageAssertions extends BaseAssertion<HomePage> {

//    public HomePageAssertions assertThatHomePageIsLoaded(UserModel user) {
//        expect(this.page.getUserAvatar()).toBeVisible(this.isVisibleOptions);
//        this.page.logger.info("-------------------------------------------------------------------");
//        this.page.logger.info("User logged with data:");
//        this.page.logger.info(" - id: " + user.id);
//        this.page.logger.info(" - email: " + user.email);
//        this.page.logger.info(" - password: " + user.password);
//        this.page.logger.info("-------------------------------------------------------------------");
//        return this;
//    }
//
//    public HomePageAssertions assertThatLogoDisplayed() {
//        expect(this.page.logo).toBeVisible(this.isVisibleOptions);
////        this.page.logo().should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatUserIsLoggedIn(String userName) {
//        expect(this.page.userName.first()).toBeVisible(this.isVisibleOptions);
//        expect(this.page.userName.first()).toContainText(userName, this.containsTextOptions);
////        this.page.userName().should('be.visible')
////        this.page.userName().should('contain.text', user.name)
//        return this;
//    }
//
//	public HomePageAssertions assertThatMenuTabIsHighlighted(String title, String rgbColor) {
//        expect(this.page.menuTab(title)).toHaveCSS("border-color", rgbColor);
////        this.page.menuTab(title).should('have.css', 'border-color').and('eq', rgbColor)
//        return this;
//    }
//
//	public HomePageAssertions assertThatMenuTabIsDisplayed(String title) {
//        expect(this.page.menuTab(title)).toBeVisible(this.isVisibleOptions);
////        this.page.menuTab(title).should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatSubmenuTabIsHighlighted(String title, String rgbColor) {
//        expect(this.page.submenuTab(title)).toHaveCSS("border-bottom", rgbColor);
////        this.page.submenuTab(title).should('have.css', 'border-bottom').and('contain', rgbColor)
//        return this;
//    }
//
//	public HomePageAssertions assertThatSubmenuTabIsDisplayed(String title) {
//        expect(this.page.submenuTab(title)).toBeVisible(this.isVisibleOptions);
////        this.page.submenuTab(title).should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatCreateButtonIsDisplayed() {
//        expect(this.page.createButton).toBeVisible(this.isVisibleOptions);
////        this.page.createButton().should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatCreateProjectButtonIsDisplayed() {
//        expect(this.page.createProjectButton).toBeVisible(this.isVisibleOptions);
////        this.page.createProjectButton().should('be.visible')
//        return this;
//    }
//
//    public HomePageAssertions assertThatCreateProjectButtonIsNotDisplayed() {
//        expect(this.page.createProjectButton).not.toBeVisible(this.isNotVisibleOptions);
//        return this;
//    }
//
	public assertThatErrorPageIsDisplayed(): HomePageAssertions {
        expect(this.page.errorMessage).toBeVisible(this.isVisibleOptions);
//        this.page.errorMessage().should('exist')
        return this;
    }

    public assertThatConfigureHomePageButtonIsDisplayed(): HomePageAssertions {
        expect(this.page.configureHomePageButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatConfigureHomePageButtonIsNotDisplayed(): HomePageAssertions {
        expect(this.page.configureHomePageButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }
//
//    public HomePageAssertions assertNotificationHasArrived(String notificationText) {
//        expect(this.page.notificationMessage(notificationText).first()).toBeVisible(this.isVisibleOptions);
//        return this;
//    }
//
//    public HomePageAssertions assertThereIsAtLeastOneNewNotification() {
//        Assert.assertTrue(Integer.parseInt(this.page.notificationsCounter.textContent()) > 0);
////        this.page.notificationsCounter.then((counterDiv) => {
////			const counterDivText = counterDiv.text();
////        cy.wrap(counterDivText).then(parseInt).should('be.gt', 0)
////		})
//        return this;
//    }
}
