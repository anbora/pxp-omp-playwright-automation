import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { HomePage } from "pages/other/HomePage";

export class HomePageAssertions extends BaseAssertion<HomePage> {

//    public HomePageAssertions assertThatHomePageIsLoaded(UserModel user) {
//        assertThat(this.page.getUserAvatar()).isVisible(this.isVisibleOptions);
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
//        assertThat(this.page.logo).isVisible(this.isVisibleOptions);
////        this.page.logo().should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatUserIsLoggedIn(String userName) {
//        assertThat(this.page.userName.first()).isVisible(this.isVisibleOptions);
//        assertThat(this.page.userName.first()).containsText(userName, this.containsTextOptions);
////        this.page.userName().should('be.visible')
////        this.page.userName().should('contain.text', user.name)
//        return this;
//    }
//
//	public HomePageAssertions assertThatMenuTabIsHighlighted(String title, String rgbColor) {
//        assertThat(this.page.menuTab(title)).hasCSS("border-color", rgbColor);
////        this.page.menuTab(title).should('have.css', 'border-color').and('eq', rgbColor)
//        return this;
//    }
//
//	public HomePageAssertions assertThatMenuTabIsDisplayed(String title) {
//        assertThat(this.page.menuTab(title)).isVisible(this.isVisibleOptions);
////        this.page.menuTab(title).should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatSubmenuTabIsHighlighted(String title, String rgbColor) {
//        assertThat(this.page.submenuTab(title)).hasCSS("border-bottom", rgbColor);
////        this.page.submenuTab(title).should('have.css', 'border-bottom').and('contain', rgbColor)
//        return this;
//    }
//
//	public HomePageAssertions assertThatSubmenuTabIsDisplayed(String title) {
//        assertThat(this.page.submenuTab(title)).isVisible(this.isVisibleOptions);
////        this.page.submenuTab(title).should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatCreateButtonIsDisplayed() {
//        assertThat(this.page.createButton).isVisible(this.isVisibleOptions);
////        this.page.createButton().should('be.visible')
//        return this;
//    }
//
//	public HomePageAssertions assertThatCreateProjectButtonIsDisplayed() {
//        assertThat(this.page.createProjectButton).isVisible(this.isVisibleOptions);
////        this.page.createProjectButton().should('be.visible')
//        return this;
//    }
//
//    public HomePageAssertions assertThatCreateProjectButtonIsNotDisplayed() {
//        assertThat(this.page.createProjectButton).not().isVisible(this.isNotVisibleOptions);
//        return this;
//    }
//
	public assertThatErrorPageIsDisplayed(): HomePageAssertions {
        this.assertThat(this.page.errorMessage).isVisible(this.isVisibleOptions);
//        this.page.errorMessage().should('exist')
        return this;
    }

    public assertThatConfigureHomePageButtonIsDisplayed(): HomePageAssertions {
        this.assertThat(this.page.configureHomePageButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatConfigureHomePageButtonIsNotDisplayed(): HomePageAssertions {
        this.assertThat(this.page.configureHomePageButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }
//
//    public HomePageAssertions assertNotificationHasArrived(String notificationText) {
//        assertThat(this.page.notificationMessage(notificationText).first()).isVisible(this.isVisibleOptions);
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
