import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { GeneralBrandingAdminPage } from "pages/admin/branding/GeneralBrandingAdminPage";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";
import { HrDataJobFamiliesPage } from "pages/admin/hrdata/HrDataJobFamiliesPage";
import { HrDataJobFunctionsPage } from "pages/admin/hrdata/HrDataJobFunctionsPage";
import { HrDataJobRolesPage } from "pages/admin/hrdata/HrDataJobRolesPage";
import { HrDataLocationPage } from "pages/admin/hrdata/HrDataLocationPage";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";
import { HrDataPage } from "pages/admin/hrdata/HrDataPage";
import { OpportunityMarketplaceGeneralPage } from "pages/admin/OpportunityMarketplaceGeneralPage";
import { OpportunityMarketplaceJobRolePage } from "pages/admin/OpportunityMarketplaceJobRolePage";
import { OpportunityMarketplaceJobVacancyPage } from "pages/admin/OpportunityMarketplaceJobVacancyPage";
import { OpportunityMarketplaceMentorshipPage } from "pages/admin/OpportunityMarketplaceMentorshipPage";
import { OpportunityMarketplaceProjectPage } from "pages/admin/OpportunityMarketplaceProjectPage";
import { OpportunityMarketplaceSourcingPage } from "pages/admin/OpportunityMarketplaceSourcingPage";
import { RolesAdminPage } from "pages/admin/roles/RolesAdminPage";
import { SettingsAnnouncementsPage } from "pages/admin/SettingsAnnouncementsPage";
import { UsersAdminPage } from "pages/admin/users/UsersAdminPage";
import { OpportunityMarketplaceConfigurationPage } from "pages/careergrowth/jobs/OpportunityMarketplaceConfigurationPage";

export class AdminPanelPage extends BasePage {

    public sidebar: Locator = this.page.locator("//span/parent::a/parent::li");
    public contentMainTab: Locator = this.page.locator("//span[text()='Content']/following-sibling::span/parent::a");
    public opportunityMarketplaceMainTab: Locator = this.page.locator("//span[text()='Talent Marketplace']/following-sibling::span/parent::a | //span[text()='Opportunity Marketplace']/following-sibling::span/parent::a");
    public mainTab(mainTab: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/following-sibling::span/parent::a", mainTab);
    }
    public submenu(menu: string): Locator {
      return this.getLocatorWithParam("//li[contains(@class, 'open')]/descendant::span[text()='%s']/parent::a", menu);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectMainTab(tab: string): AdminPanelPage {
        sidebar.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.ATTACHED).setTimeout(120000));
        if (sidebar.first().getAttribute("class").contains("open sidebar-nav-item")) {
            contentMainTab.click();
        }
        this.pause(1000);
//        cy.wait(1000)
        this.mainTab(tab).click();
        return this.getPageClassInstance(AdminPanelPage);
    }

	public selectOpportunityMarketplace(): AdminPanelPage {
        if (sidebar.first().getAttribute("class").contains("open sidebar-nav-item")) {
            contentMainTab.click();
        }
//        cy.wait(1000)
        opportunityMarketplaceMainTab.click();
        return this;
    }

    public openMenuForHRData(menu: string): HrDataPage {
        this.submenu(menu).click();
        return this.getPageClassInstance(HrDataPage);
    }

    public openUsersPage(): UsersAdminPage {
        this.submenu("Users").click();
        return this.getPageClassInstance(UsersAdminPage);
    }

    public openRolesPage(): RolesAdminPage {
        this.submenu("Roles").click();
        return this.getPageClassInstance(RolesAdminPage);
    }
    public openMenuForJobFamiliesHRData(): HrDataJobFamiliesPage {
        this.submenu("Job Families").click();
        return this.getPageClassInstance(HrDataJobFamiliesPage);
    }

    public openMenuForJobRolesHRData(): HrDataJobRolesPage {
        this.submenu("Job Roles").click();
        return this.getPageClassInstance(HrDataJobRolesPage);
    }

    public openMenuForHrConfiguration(): HrDataConfigurationPage {
        this.submenu("Configuration").click();
        return this.getPageClassInstance(HrDataConfigurationPage);
    }

    public openMenuForJobFunctionsHRData(): HrDataJobFunctionsPage {
        this.submenu("Job Functions").click();
        return this.getPageClassInstance(HrDataJobFunctionsPage);
    }

    public openMenuForLocationHRData(): HrDataLocationPage {
        this.submenu("Location").click();
        return this.getPageClassInstance(HrDataLocationPage);
    }

	public openMenuForOpportunityMarketplace(menu: string): OpportunityMarketplaceConfigurationPage {
        this.submenu(menu).click();
        return this.getPageClassInstance(OpportunityMarketplaceConfigurationPage);
    }

    public openMenuForOrganizationHRData(): HrDataOrganizationPage {
        this.submenu("Organizational Units").click();
        return this.getPageClassInstance(HrDataOrganizationPage);
    }

    public openSettingsAnnouncementsPage(): SettingsAnnouncementsPage {
        this.submenu("Announcements").click();
        return this.getPageClassInstance(SettingsAnnouncementsPage);
    }

    public openMenuForGeneralOpportunityMarketplace(): OpportunityMarketplaceGeneralPage {
        this.submenu("General").click();
        return this.getPageClassInstance(OpportunityMarketplaceGeneralPage);
    }

    public openMenuForJobRoleOpportunityMarketplace(): OpportunityMarketplaceJobRolePage {
        this.submenu("Job Role").click();
        return this.getPageClassInstance(OpportunityMarketplaceJobRolePage);
    }

    public openMenuForJobVacancyOpportunityMarketplace(): OpportunityMarketplaceJobVacancyPage {
        this.submenu("Job Vacancy").click();
        return this.getPageClassInstance(OpportunityMarketplaceJobVacancyPage);
    }

    public openMenuForProjectOpportunityMarketplace(): OpportunityMarketplaceProjectPage {
        this.submenu("Project").click();
        return this.getPageClassInstance(OpportunityMarketplaceProjectPage);
    }

    public openMenuForMentorshipOpportunityMarketplace(): OpportunityMarketplaceMentorshipPage {
        this.submenu("Mentorship").click();
        return this.getPageClassInstance(OpportunityMarketplaceMentorshipPage);
    }
    public openMenuForSourcingOpportunityMarketplace(): OpportunityMarketplaceSourcingPage {
        this.submenu("Sourcing").click();
        return this.getPageClassInstance(OpportunityMarketplaceSourcingPage);
    }

    public openGeneralBrandingPage(): GeneralBrandingAdminPage {
        this.submenu("General").click();
        return this.getPageClassInstance(GeneralBrandingAdminPage);
    }
}
