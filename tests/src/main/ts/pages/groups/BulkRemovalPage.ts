import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Download, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";

export class BulkRemovalPage extends BasePage {
  static pageModel = { pageName: "Invite Team Members Page", url: "/teams/%s/bulk-removal" };
    private static readonly UPLOADING_BUTTON_XPATH: string = "//button[text()='Uploading...']";
    public uploadButton: Locator = this.page.locator("//button[text()='Upload']");
    public uploadingButton: Locator = this.page.locator("//button[text()='Uploading...']']");
    public uploadCsvFileButton: Locator = this.page.locator("//button[text()= 'Browse...']");
    public downloadCSVReportButton: Locator = this.page.locator("//button[text()='Download CSV file']");
    public downloadSampleFileButton: Locator = this.page.locator("//button[contains(@class,'sample-button')]");
    public removeInBulkButton: Locator = this.page.locator("//button[text()='Remove']");
    public downloadfilename: string = "";

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickDownloadSampleFileButton(): BulkRemovalPage {
        try {
            FileUtils.cleanDirectory(new File(System.getProperty("user.dir") + File.separator + "Downloads"));
        } catch (e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        Download downloadCSV=this.page.waitForDownload(() =>{
            downloadSampleFileButton.click();
            this.pause(10000);
        });
        downloadCSV.saveAs(Paths.get(System.getProperty("user.dir") + File.separator + "Downloads", downloadCSV.suggestedFilename()));
      let downloadfilename:  = downloadCSV.suggestedFilename();
        return this;
    }

    public convertFileToText(fileName: string, content: ResultContainer): BulkRemovalPage {
        let fileContent: string = null;
        let downloadedFile: Path = Paths.get(System.getProperty("user.dir") + File.separator + "Downloads", fileName);
        try {
          let fileContent:  = Files.readString(downloadedFile);
        } catch (e) {
            throw new RuntimeException(e);
        }
        content.setValue(fileContent);
        return this;
    }

    public uploadBulkRemovalCsvFile(filePath: string): BulkRemovalPage {
        this.uploadFile(filePath, uploadCsvFileButton);
        return this;
    }

    public clickUploadButton(): BulkRemovalPage {
        uploadButton.click();
        return this;
    }

    public clickRemoveInBulkButton(): GroupDetailsPage {
        removeInBulkButton.click();
      while(null: this.page.querySelector(UPLOADING_BUTTON_XPATH) !=):  {
            this.page.waitForTimeout(100);
        }
        return this.getPageClassInstance(GroupDetailsPage);
    }

    public clickDownloadRemoveReportButton(): BulkRemovalPage {
        try {
            FileUtils.cleanDirectory(new File(System.getProperty("user.dir") + File.separator + "Downloads"));
        } catch (e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        Download downloadCSV=this.page.waitForDownload(() =>{
            downloadCSVReportButton.click();
            this.pause(10000);
        });
        downloadCSV.saveAs(Paths.get(System.getProperty("user.dir") + File.separator + "Downloads", downloadCSV.suggestedFilename()));
      let downloadfilename:  = downloadCSV.suggestedFilename();
        return this;
    }

}
