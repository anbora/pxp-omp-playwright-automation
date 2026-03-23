import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";

export abstract class SkillsStudioGlobalNavigationPage extends BasePage{

    public select_organization_dropdown_loc: Locator = this.page.locator("//button[@class='sc-gytJtb kvLtHN']");
    public select_organization_loc(org_name: string): Locator {
      return this.getLocatorWithParam("//li[text()='%s']", org_name);
    }
    public select_org_confirm_button_loc: Locator = this.page.locator("//button[@class='sc-cYYuRe kttNPN']");
    public logOutButton: Locator = this.page.locator("//span[text()='Logout']");
    public humbergenMenuNavigation(nav_name: string): Locator {
      return this.getLocatorWithParam("//nav//span[text()='%s']", nav_name);
    }
    public Learning_Recommendations_Tab_Loc: Locator = this.page.locator("//ul[@role=\"tablist\"]//a//span[text()='LEARNING RECOMMENDATIONS']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    constructor(browser: Browser, pageHandler: PageHandler, url: string, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, url, logger, portalIndex);

    }

    public <T extends BasePage> selectOrganization(org_name: string, clazz: Class<T>): T {
        select_organization_dropdown_loc.click();
        this.select_organization_loc(org_name).click();
        select_org_confirm_button_loc.click();
        return this.getPageClassInstance(clazz);
    }

    public <T extends BasePage> navigateHumbergenMenu(path: string[], clazz: Class<T>): T {
        for (const nav_name of path) {
            this.humbergenMenuNavigation(nav_name).click();
        }
        return this.getPageClassInstance(clazz);
    }

    public <T extends BasePage> createExcelFile(headers: string[], data: string[][], fileName: string, clazz: Class<T>): T {
      try(XSSFWorkbook(): Workbook workbook = new):  {
            let sheet: Sheet = workbook.createSheet("Sheet1");
            // Create header row
            let headerRow: Row = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                let cell: Cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
            // Create data rows
            for (int rowNum = 0; rowNum < data.length; rowNum++) {
                let row: Row = sheet.createRow(rowNum + 1);
                let rowData: string[] = data[rowNum];
                for (int colNum = 0; colNum < headers.length; colNum++) {
                    let cell: Cell = row.createCell(colNum);
                    if (colNum < rowData.length) {
                        cell.setCellValue(rowData[colNum]);
                    } else {
                        cell.setCellValue(""); // If no value provided for the column
                    }
                }
            }
            // Write the workbook to a file
          try(FileOutputStream(fileName): FileOutputStream fileOut = new):  {
                workbook.write(fileOut);
                System.out.println("Excel file has been created successfully.");
            }
        } catch (e) {
            e.printStackTrace();
        }
        return this.getPageClassInstance(clazz);
    }

    public <T extends BasePage> logoutSkillsStudio(clazz: Class<T>): T {
        logOutButton.click();
        return this.getPageClassInstance(clazz);
    }

    public <T extends BasePage> navigateToLearningRecommendations(clazz: Class<T>): T {
        Learning_Recommendations_Tab_Loc.click();
        return this.getPageClassInstance(clazz);
    }

}
