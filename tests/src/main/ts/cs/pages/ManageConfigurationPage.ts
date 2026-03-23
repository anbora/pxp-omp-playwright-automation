import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Download, Locator, Page } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";
import { ResultContainer } from "models/ResultContainer";

export class ManageConfigurationPage extends GlobalNavigationPage{

	public buttonUsingText(message: string): Locator {

	  return this.getLocatorWithParam("button:has-text('%s')", message);

	}
	public tableHeaders: Locator = this.page.locator("div#simple-tabpanel-0 th>div,div#simple-tabpanel-1 th>div");
	public Reviewbutton(course: string): Locator {
	  return this.getLocatorWithParam("//span[@title='%s']/ancestor:: td/following-sibling:: td//button", course);
	}
	public courseTitle(course: string): Locator {
	  return this.getLocatorWithParam("//span[@title='%s']", course);
	}
	public closeReiewDialog: Locator = this.page.locator("[data-testid='CloseIcon']");
	public courseTitleCourseDetailsPage(course: string): Locator {
	  return this.getLocatorWithParam("//div[text()='%s']", course);
	}
	public courseDetailsPage_contentPartner(name: string): Locator {
	  return this.getLocatorWithParam("//div[text()='CONTENT PARTNER']/following-sibling:: *//*[text()='%s']", name);
	}
	public CourseDetailsPage_Duration(duration: string): Locator {
	  return this.getLocatorWithParam("//*[text()='DURATION']/following-sibling:: *[text()='%s']", duration);
	}
	public downloadfilename: string = "";
	public noContentmessage: Locator = this.page.locator("//p[text()='There are no courses scheduled to be retired']");
	public tableData(course: string, columnName: string): Locator {
	  return this.getLocatorWithParam("(//span[text()='%s']/ancestor::tr/td[contains(@id,'%s')])[1]", course,columnName);
	}
	public replacementCourse: Locator = this.page.locator("//p[text()='Replacement course:']/following:: div//p");

	constructor(browser: Browser, page: PageHandler, logger: Logger, portalIndex: number) {
        super(this.browser, this.page, this.logger, this.portalIndex);
        //this.page.waitForSelector(selectorForWait, new Page.WaitForSelectorOptions().setTimeout(60000));
    }

	public manageContentRefresh(name: string): ManageConfigurationPage {
		this.buttonUsingText(name).isVisible();
		return this;
	}

	public clickDownloadCSV(): ManageConfigurationPage {

		try {
			FileUtils.cleanDirectory(new File(System.getProperty("user.dir")+File.separator+"Downloads"));
		} catch (e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		Download downloadCSV=this.page.waitForDownload(() =>{
			this.buttonUsingText("Download CSV").click();
		});
		downloadCSV.saveAs(Paths.get(System.getProperty("user.dir")+File.separator+"Downloads", downloadCSV.suggestedFilename()));
		downloadfilename=downloadCSV.suggestedFilename();
		return this;
	}

	public clickRemovedContentTab(): ManageConfigurationPage {
		this.buttonUsingText("Removed content").click();
		return this;
	}

	public clickUpcomintRemovalTab(): ManageConfigurationPage {
		this.buttonUsingText("Upcoming removals").click();
		return this;
	}

	public tableheader(): ManageConfigurationPage {
		let allheaders: java.util.Array<string> = this.page.locator("div#simple-tabpanel-0 th>div").allInnerTexts();
		return this;
	}

	public waitForTablePresent(): ManageConfigurationPage {
		this.pause(180000);
		this.page.waitForSelector("div#simple-tabpanel-0 th button,div#simple-tabpanel-1 th button", new Page.WaitForSelectorOptions().setTimeout(150000));
		this.pause(5000);
		return this;
	}

	public clickCourseReviewButton(course: string): ManageConfigurationPage {
		this.Reviewbutton(course).first().click();
		return this;
	}

	public clickCourse(course: string): ManageConfigurationPage {
		return this.openPageInNewTab(courseTitle(course),ManageConfigurationPage);
		//return this;
	}

	public closeReviewDialog(): ManageConfigurationPage {
		closeReiewDialog.click();
		return this;
	}

	public clickViewCourseButton(): ManageConfigurationPage {

	  return openPageInNewTab(buttonUsingText("View Course").first(), ManageConfigurationPage);

	}

	public verifydownloadedFile(): ManageConfigurationPage {

		try {
			let fileData: any = new Scanner(new File(System.getProperty("user.dir")+File.separator+"Downloads"+File.separator+downloadfilename));
			fileData.useDelimiter(",");
			while (fileData.hasNext())  //returns a boolean value
			{
				if(fileData.next().contains("Course LOID")) {
					System.out.println("True");
				}
			}
			fileData.close();
		} catch (e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return this;
	}

	public getCollectionsPartOfCount(count: ResultContainer, couseName: string, columnName: string): ManageConfigurationPage {
		count.setValue(tableData(couseName, columnName).innerText());
		return this;
	}

	public geReplacementCourseName(couseName: ResultContainer): ManageConfigurationPage {
		couseName.setValue(replacementCourse.innerText());
		return this;
	}
}
