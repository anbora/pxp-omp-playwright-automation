import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { CategoryLibraryAssertions } from "skillstudio/assertions/CategoryLibraryAssertions";
import { SkillsStudioCategoryNavigationPage } from "skillstudio/pages/SkillsStudioCategoryNavigationPage";

export class CategoryLibraryPage extends SkillsStudioCategoryNavigationPage {
    public static previousCount: number;
    public static afterCount: number;
    public static categorCount: string;
    public static successMessage: string;

    public Category_Label_Loc: Locator = this.page.locator("//h3[text()='Category library']");
    public Add_Category_Popup_Loc: Locator = this.page.locator("//div[@id=\"AddCategory__title\"]");
    public Category_Name_Inp_Loc: Locator = this.page.locator("//input[@id=\"categoryName\"]");
    public Show_Categories_Toggle_Button_Loc: Locator = this.page.locator("//div[@data-testid=\"toggle-container\"]//div");
    public Pagination_Info_Loc: Locator = this.page.locator("//span[@data-testid='pagination-info-text']");
    public Select_Child_Category_Checkbox_Loc: Locator = this.page.locator("//div[@class=\"custom-paper\"]//label[text()='Select child categories']//ancestor::div[2]//input");
    public Categor_Count_Loc: Locator = this.page.locator("//div[@class=\"sc-fgSWkL zUqzG\"]//p");
    public Categor_Table_Coloumn_Header_Loc: Locator = this.page.locator("//div[contains(@class,\"custom-paper\")]//span[text()='Name']//ancestor::tr//span[text()='Status']");
    public Coloum_Action_Loc: Locator = this.page.locator("//span[text()='Name']//ancestor::div[2]//button[@data-testid=\"columnActionMenu\"]");
    public Filter_By_Name_Loc: Locator = this.page.locator("//span[text()='Filter by Name']");
    public Filter_Search_Text_Bar_Loc: Locator = this.page.locator("//input[@aria-label='Filter by Name']");
    public Category_Link_Loc: Locator = this.page.locator("//a//span[text()='Categories']");
    public Add_Child_Category_Input_Loc: Locator = this.page.locator("//button[text()='Add category']");
    public Close_Button_Loc: Locator = this.page.locator("//button[@aria-label=\"close\"]");

    public Expand_Category_Loc: Locator = this.page.locator("//button[text()='Open all']");
    public Category_Description_Loc: Locator = this.page.locator("//label[text()='Description']//ancestor::div//textarea");
    public Category_Detail_Page_Loc: Locator = this.page.locator("//label[@for=\"name\"]//ancestor::div[3]//div[contains(text(),'150')]//ancestor::div[6]//div[contains(text(),'500')]");

    public Update_Category_Input_Loc: Locator = this.page.locator("//input[@id=\"name\"]");

    public Change_Node_Chnage_Location_Loc: Locator = this.page.locator("//div[@id=\"MoveCategory__description\"]//button[text()='Confirm']");

    public Change_Node_Chnage_Location_Button(action: string): Locator {

      return this.getLocatorWithParam("//div[@id=\"MoveCategory__description\"]//button[text()='%s']", action);

    }

    public Category_Create_Button(action: string): Locator {

      return this.getLocatorWithParam("//div[contains(@class,\"flex justify-center\")]//button[text()='%s']", action);

    }

    public Child_Category_Creation(action: string): Locator {

      return this.getLocatorWithParam("//div[contains(@class,\"sc-flBipw\")]//button[text()='%s']", action);

    }

    public Delete_Category_Button(action: string): Locator {

      return this.getLocatorWithParam("//button[text()='%s']", action);

    }

    public Created_Category_label(category_name: string): Locator {

      return this.getLocatorWithParam("//tbody//span[text()='%s']", category_name);

    }

    public Created_Child_Category_label(parent_category: string, child_category: string): Locator {

      return this.getLocatorWithParam("//tbody//span[text()='%s']//ancestor::tbody[1]//span[text()='%s']", parent_category,child_category);

    }

    public Created_Category_Header(category_name: string): Locator {

      return this.getLocatorWithParam("//h2[text()='%s']", category_name);

    }

    public Category_Status_Toggle_Button(status: string): Locator {

      return this.getLocatorWithParam("//div[@class=\"sc-buvPDS crVFrV\"]//div[text()='%s']//ancestor::div[1]//div[@data-testid=\"toggle-container\"]", status);

    }

    public Category_Name_From_Table(category_name: string): Locator {

      return this.getLocatorWithParam("(//div[@class=\"custom-paper\"])[2]//tr//td//span[text()='%s']", category_name);

    }

    public Select_Category_From_Table(category_name: string): Locator {

      return this.getLocatorWithParam("//table//tbody//tr//td//label[text()='%s']", category_name);

    }

    public Category_Status_From_Table(category_name: string, status: string): Locator {

      return this.getLocatorWithParam("//table//tbody//tr//label[text()='%s']//ancestor::tr[1]//td[text()='%s']", category_name, status);

    }

    public Category_Detail_Page_Loc(category_name: string): Locator {

      return this.getLocatorWithParam("//p[text()='Category Details']//ancestor::div[3]//input[@value=\"%s\"]", category_name);

    }

    public Warning_Popup_Delete(action: string): Locator {

      return this.getLocatorWithParam("//div[@aria-describedby=\"DeleteCategory__description\"]//div[text()='Delete Category']//ancestor::div[1]//div[text()='Are you sure you want to delete this category type and the full category tree? No skills will be deleted.']//ancestor::div[4]//button[text()='%s']", action);

    }
    public Warning_Popup_Delete_Child_Category(action: string): Locator {
      return this.getLocatorWithParam("//div[@aria-describedby=\"DeleteCategory__description\"]//div[text()='Delete Category']//ancestor::div[1]//div[text()='Are you sure you want to delete this category?']//ancestor::div[1]//div[text()='All the child categories will be deleted too.']//ancestor::div[4]//button[text()='%s']", action);
    }

    public Save_And_Discard_Changes(action: string): Locator {

      return this.getLocatorWithParam("//button[@aria-disabled=\"false\"][text()='%s']", action);

    }

    public Category_Detail_Page(category_name: string): Locator {

      return this.getLocatorWithParam("//p[text()='Category Details']//ancestor::div[3]//label[text()='Name']//ancestor::div[1]//input[@value=\"%s\"]//ancestor::div[6]//label[text()='Description']", category_name);

    }

    public Category_Alert_Message(message: string): Locator {

      return this.getLocatorWithParam("(//div[@id='rcl-toasts-container']//div[text()='%s'])[1]", message);

    }

    public Category_Status_SaveAndDiscard(action: string): Locator {

      return this.getLocatorWithParam("//span[text()='Update category status']//ancestor::div[2]//button[text()='%s']", action);

    }

    public Add_Category_Popup(parentCategory: string): Locator {

      return this.getLocatorWithParam("//div[@aria-labelledby=\"AddCategory__title\"]//div[text()='Category Path']//ancestor::div[1]//div[text()='%s']//ancestor::div[2]//div[text()='0 / 150']//ancestor::div[3]//input", parentCategory);

    }

    public Expand_And_Collapse_Category(action: string): Locator {

      return this.getLocatorWithParam("//button[text()='%s']", action);

    }

    public Category_Node_Change_Popup(subChildCategory: string, parentCategory: string): Locator {

      return this.getLocatorWithParam("//div[@id=\"MoveCategory__description\"]//div[text()='Change node location']//ancestor::div[1]//div[text()='Move "+subChildCategory+" to "+parentCategory+"']");

    }

    public Category_Node_Change_Parent_Popup(sourceCateogry: string, parentCategory: string, targetCategory: string): Locator {

      return this.getLocatorWithParam("//div[@id=\"MoveCategory__description\"]//div[text()='Change node location']//ancestor::div[1]//div[text()='Move "+sourceCateogry+" to "+parentCategory+" > "+targetCategory+"']");

    }

    public Category_Change_Verification(action: string): Locator {

      return this.getLocatorWithParam("//div[text()='%s']//ancestor::div[5]//button[text()='Cancel']", action);

    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public createNewCategoryType(category_name: string, action: string): CategoryLibraryPage {
        Category_Name_Inp_Loc.fill(category_name);
        this.Category_Create_Button(action).click();
        this.page.waitForTimeout(10000);
        return this;
    }

    public cancelNewCategory(action: string): CategoryLibraryPage {
        this.Category_Create_Button(action).click();
        return this;
    }

    public toggleShowCategoriesButton(): CategoryLibraryPage {
        Show_Categories_Toggle_Button_Loc.click();
        return this;
    }

    public selectCategoryFromTable(category_name: string): CategoryLibraryPage {
        this.Category_Name_From_Table(category_name).click();
        return this;
    }

    public getPreviousSkillCountInCategory(): CategoryLibraryPage {
        let previousCounts: string = Pagination_Info_Loc.textContent();
        let parts: string[] = previousCounts.split(" ");
        let number: string = parts[2];
      let previousCount:  = Integer.parseInt(number);
        return this;
    }

    public getAfterSkillCountInCategory(): CategoryLibraryPage {
        let afterCounts: string = Pagination_Info_Loc.textContent();
        let parts: string[] = afterCounts.split(" ");
        let number: string = parts[2];
      let afterCount:  = Integer.parseInt(number);
        return this;
    }

    public clickChildCategoryCheckbox(): CategoryLibraryPage {
        Select_Child_Category_Checkbox_Loc.click();
        return this;
    }

    public getCategoryPageHeader(): CategoryLibraryPage {
      let categorCount:  = Categor_Count_Loc.textContent();
        return this;
    }

    public filterCategoryByName(category_name: string): CategoryLibraryPage {
        Coloum_Action_Loc.click();
        Filter_By_Name_Loc.click();
        Filter_Search_Text_Bar_Loc.fill(category_name);
        this.Select_Category_From_Table(category_name).click();
        return this;
    }

    public deleteCategory(action: string): CategoryLibraryPage {
        this.pause(2000);
        this.Delete_Category_Button(action).click();
        return this;
    }

    public deleteCategoryPermission(action: string): CategoryLibraryPage {
        this.Warning_Popup_Delete(action).click();
      let successMessage:  = this.page.textContent("body");
        return this;
    }

    public updateCateogoryDescription(desc: string, action: string): CategoryLibraryPage {
        this.pause(2000);
        Category_Description_Loc.fill(desc);
        this.Save_And_Discard_Changes(action).click();
        return this;
    }

    public goToCategoryLibraryPageFromManagePage(): CategoryLibraryPage {

        Category_Link_Loc.click();
        return this;
    }

    public toggleCategoryTypeStatus(currentStatus: string, action: string): CategoryLibraryPage {
        this.pause(2000);
        this.Category_Status_Toggle_Button(currentStatus).click();
        this.Category_Status_SaveAndDiscard(action).click();
        return this;
    }

    public searchCategoryByCategoryName(category_name: string): CategoryLibraryPage {
        Coloum_Action_Loc.click();
        Filter_By_Name_Loc.click();
        Filter_Search_Text_Bar_Loc.fill(category_name);
        return this;
    }

    public addChildCategoryToParentCategory(parent_category: string, child_category: string, action: string): CategoryLibraryPage {
        let parent_cat: string = parent_category+" > New category name...";
        Add_Child_Category_Input_Loc.click();
        this.Add_Category_Popup(parent_cat).fill(child_category);

        if (action=="Cancel" || action=="Create")
        {
            this.Child_Category_Creation(action).click();
        }
        else
        {
            Close_Button_Loc.click();
        }
        return this;
    }

    public addSubChildCategoryChildCategory(parent_category: string, child_category: string, subchild_category: string, action: string): CategoryLibraryPage {
        let parent_cat: string = parent_category+" > "+child_category+" > New category name...";
        this.Created_Category_label(child_category).click();
        Add_Child_Category_Input_Loc.click();
        this.Add_Category_Popup(parent_cat).fill(subchild_category);

        if (action=="Cancel" || action=="Create")
        {
            this.Child_Category_Creation(action).click();
        }
        else
        {
            Close_Button_Loc.click();
        }
        return this;
    }

    public deleteChildCategory(parent_category: string, child_category: string, action: string): CategoryLibraryPage {
        this.pause(2000);
        this.Created_Child_Category_label(parent_category,child_category).click();
        this.Delete_Category_Button(action).click();
        return this;
    }

    public deleteChildCategoryPermission(action: string): CategoryLibraryPage {
        this.Warning_Popup_Delete_Child_Category(action).click();
      let successMessage:  = this.page.textContent("body");
        return this;
    }

    public updateCategoryFromManagePage(category_name: string, updated_name: string, update_desc: string, action: string): CategoryLibraryPage {
        this.Created_Category_label(category_name).click();
        Update_Category_Input_Loc.fill(updated_name);
        this.updateCateogoryDescription(update_desc,action);
        return this;
    }

    public ExpandCategory(action: string): CategoryLibraryPage {
        this.pause(2000);
        this.Expand_And_Collapse_Category(action).click();
        return this;
    }

    public dragAndDropCategory(subChildCategory: string, parentCategory: string): CategoryLibraryPage {
        this.pause(3000);
        //Locator source = this.page.locator("//tbody//span[text()='"+childCategoryName+"']//ancestor::tbody[1]//span[text()='"+subChildCategory+"']");
        let source: Locator = this.page.locator("//tbody//span[text()='"+subChildCategory+"']");
        let target: Locator = this.page.locator("//tbody//span[text()='"+parentCategory+"']");
        source.dragTo(target);
        this.pause(3000);

        return this;
    }

    public handelChangeNodeLocationPopup(parent_category: string, child_category: string, action: string): CategoryLibraryPage {

        let category: string = parent_category+" > "+child_category;
        //Change_Node_Chnage_Location_Loc.click();
        this.Change_Node_Chnage_Location_Button(action).click();
        this.Created_Child_Category_label(parent_category,child_category).click();
        this.Delete_Category_Button("Delete Category").click();
        this.pause(3000);
        this.Category_Change_Verification(category).click();
        this.pause(3000);
        return this;
    }

    public handelParentChangeNodeLocationPopup(parent_category: string, child_category: string, sub_child: string, action: string): CategoryLibraryPage {

        let category: string = parent_category+" > "+child_category+" > "+sub_child;
        //Change_Node_Chnage_Location_Loc.click();
        this.Change_Node_Chnage_Location_Button(action).click();
        this.Created_Child_Category_label(parent_category,sub_child).click();
        this.Delete_Category_Button("Delete Category").click();
        this.pause(3000);
        this.Category_Change_Verification(category).click();
        this.pause(3000);
        return this;
    }

}
