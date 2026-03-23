import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export class LearningRecommendationsPage extends SkillsStudioGlobalNavigationPage {

    public static text: string;
    public Learning_Content_Language_Loc: Locator = this.page.locator("//section[@role=\"tabpanel\"]//label[text()='Learning Content Language']//ancestor::div[1]//div[@aria-label=\"dropdown-selector\"]//button[text()=\"English\"]");
    public Empty_Training_Sample_Page_Loc: Locator = this.page.locator("//img[@alt=\"empty page\"]//ancestor::div[2]//div[text()='This custom skill has no training samples: add something new to begin refining learning recommendations.']//ancestor::div[1]//button[text()=\"Add learning content\"]//ancestor::div[1]//button[text()=\"Add other samples\"]");
    public Toggle_Button_For_Custom_Skill_Loc: Locator = this.page.locator("//div[@class=\"flex\"]//p[text()='Training samples']//ancestor::div[2]//p[text()='Result samples']");
    public Result_Sample_Button_Loc: Locator = this.page.locator("//div[@class=\"flex\"]//p[text()='Result samples']");
    public Empty_Result_Sample_Page_Loc: Locator = this.page.locator("//img[@alt=\"empty page\"]//ancestor::div[2]//div[text()='No matching content found for this skill in the selected language. Click the button below to start matching content.']");
    public Rerun_Recommendations_Link_Loc: Locator = this.page.locator("//button[@type=\"button\"]//span[text()='Rerun Recommendations']");
    public Rerun_Recommendations_Button_Loc: Locator = this.page.locator("//button[@type=\"button\"][text()='Rerun Recommendations']");
    public Add_Learning_Content_Loc: Locator = this.page.locator("//button[text()='Add learning content']");
    public Add_Content_Link_Loc: Locator = this.page.locator("//button[@type=\"button\"]//span[text()='Add content']");
    public Learning_Content_Recommendations_Loc: Locator = this.page.locator("//div[@data-cy=\"CourseCardList\"]");
    public Learning_Content_Cards_Loc: Locator = this.page.locator("(//div[contains(@class,'w-304')]//span[text()='Training']//ancestor::div[3])[1]//p[text()='NA']//ancestor::div[1]//p[text()='rss']");
    public Card_Show_Detail_Loc: Locator = this.page.locator("(//button[text()='Show Details'])[1]");
    public Card_Detail_Page_Heading_Loc: Locator = this.page.locator("((//div[@class=\"overflow-y-auto\"])[1]//span)[2]");
    public Card_Detail_Page_Loc: Locator = this.page.locator("(//div[@class=\"overflow-y-auto\"]//p[text()='Url:'])[1]//ancestor::div[2]//p[text()='Topics :']");
    public Card_Delete_Loc: Locator = this.page.locator("(//div[contains(@class,'w-304')])[1]//div[contains(@class,'cursor-pointer')]");
    public Close_Card_Detail_Page_Loc: Locator = this.page.locator("((//div[contains(@class,'bg-white')])[4]//div[contains(@class,'flex items-center')])[2]");
    public Close_Card_Details_Page_Loc: Locator = this.page.locator("((//div[contains(@class,'bg-white')])[3]//div[contains(@class,'flex items-center')])[2]");
    public Training_And_Results_Sample_Button_Loc(action: string): Locator {
      return this.getLocatorWithParam("//div[@class=\"flex\"]//p[text()='%s']", action);
    }
    public Content_Type_loc(contentType: string): Locator {
      return this.getLocatorWithParam("//legend[text()='Content type']//ancestor::div[1]//label[text()='%s']", contentType);
    }
    public Input_Field_loc(field: string, value: string): Locator {
      return this.getLocatorWithParam("//label[text()='%s']//ancestor::div[1]//input[@placeholder=\"%s\"]", field,value);
    }
    public Search_Or_Cancel_Button_loc(action: string): Locator {
      return this.getLocatorWithParam("//div[@class=\"text-center\"]//button[text()='%s']", action);
    }
    public Select_Content_From_Recommendations(total: number): Locator {
      return this.getLocatorWithParam("(//div[contains(@class,'w-304')]//input[@type=\"checkbox\"])[%s]", String.valueOf(total));
    }
    public Add_Contents_To_Skill_loc(total: number): Locator {
      return this.getLocatorWithParam("//span[text()='SELECTED CONTENTS: %s']//ancestor::div[2]//button[text()='Add contents to the skill']", String.valueOf(total));
    }
    public Learning_Content_On_Training_Sample_Page_Loc(total: number): Locator {
      return this.getLocatorWithParam("//p[text()='%s'][text()=' Contents']", String.valueOf(total));
    }
    public Alert_Message_Loc(message: string): Locator {
      return this.getLocatorWithParam("(//div[@id='rcl-toasts-container']//div[text()='%s'])[1]", message);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public toggleBetweenTrainignAndResultSamples(action: string): LearningRecommendationsPage {
        this.Training_And_Results_Sample_Button_Loc(action).click();
        return this;
    }

    public goToAddLearningContentPage(): LearningRecommendationsPage {
        Add_Learning_Content_Loc.click();
        return this;
    }

    public searchForContent(query: string): LearningRecommendationsPage {
        this.Input_Field_loc("Query","Insert query").fill(query);
        this.Search_Or_Cancel_Button_loc("Search").click();
        return this;
    }

    public addLearningContent(numberOfContent: number): LearningRecommendationsPage {

        for (int i = 1; i <= numberOfContent ; i++) {
            this.Select_Content_From_Recommendations(i).click();
            this.page.waitForTimeout(1000);
        }
        this.pause(2000);
        this.Add_Contents_To_Skill_loc(numberOfContent).click();

        return this;
    }

    public cardDetailPage(): LearningRecommendationsPage {
        Card_Show_Detail_Loc.click();
      let text:  = Card_Detail_Page_Heading_Loc.textContent();
        return this;
    }

    public closeCardDetailPage(): LearningRecommendationsPage {
        Close_Card_Detail_Page_Loc.click();
        return this;
    }

    public deleteCardFromTrainingPage(): LearningRecommendationsPage {
        Card_Delete_Loc.click();
        return this;
    }
    public cancelCardDetailPage(): LearningRecommendationsPage {
        Close_Card_Details_Page_Loc.click();
        return this;
    }

}
