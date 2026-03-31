// @ts-nocheck
import { ValidateUploadSkillTemplateTest } from "com/skillstudio/ValidateUploadSkillTemplateTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CategoryLibraryPage } from "skillstudio/pages/CategoryLibraryPage";
import { expect } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";

export class VerifyCreationOfNewCategoryTest extends BaseTest {
    new_category_nav_path: string[] = ["Libraries", "Skills", "Categories"];
    parentCategoryName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    updatedParentCatName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    childCategoryName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    updateChildCategoryName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    randomCategoryDesc: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    updatedCategoryDesc: string = ValidateUploadSkillTemplateTest.generateRandomString(5);

    public verifyCreationOfNewCategory(): void {
                let __page1: any = this;
        __page1 = __page1.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page1 = __page1.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page1 = __page1.launchSkillStudio();
        __page1 = __page1.getPageClass(CategoryLibraryPage);
        __page1 = __page1.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page1 = __page1.getCategoryPageHeader();
        expect(__page1.Category_Label_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.New_Category_Type_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Categor_Table_Coloumn_Header_Loc).toBeVisible({ timeout: 30000 });
        assertTrue(categorCount.contains("Category Type"));
        __page1 = __page1.navigateToNewCategoryTypeLink(CategoryLibraryPage);
        expect(__page1.Add_Category_Popup_Loc).toBeVisible({ timeout: 30000 });
        this.pause(1000);
        __page1 = __page1.cancelNewCategory("Cancel");
        expect(__page1.Add_Category_Popup_Loc).not.toBeVisible();
        this.pause(1000);
        __page1 = __page1.navigateToNewCategoryTypeLink(CategoryLibraryPage);
        expect(__page1.Add_Category_Popup_Loc).toBeVisible({ timeout: 30000 });
        this.pause(1000);
        __page1 = __page1.createNewCategoryType(this.parentCategoryName, "Create");
        let status: string = "enabled";
        expect(__page1.Created_Category_label(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        expect(__page1.Created_Category_Header(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        expect(__page1.Category_Status_Toggle_Button(status)).toBeVisible({ timeout: 30000 });
        expect(__page1.Save_And_Discard_Changes("Save changes")).not.toBeVisible();
        expect(__page1.Save_And_Discard_Changes("Discard changes")).toBeVisible({ timeout: 30000 });
        expect(__page1.Category_Detail_Page(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        expect(__page1.Category_Detail_Page_Loc).toBeVisible({ timeout: 30000 });
        __page1 = __page1.updateCateogoryDescription(this.randomCategoryDesc, "Save changes");
        expect(__page1.Category_Alert_Message("Category updated successfully")).toBeVisible();
        expect(__page1.Created_Category_label(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.toggleCategoryTypeStatus("enabled", "Save Changes");
        expect(__page1.Category_Alert_Message("Category updated successfully")).toBeVisible();
        __page1 = __page1.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page1 = __page1.searchCategoryByCategoryName(this.parentCategoryName);
        expect(__page1.Category_Status_From_Table(this.parentCategoryName,"disabled")).toBeVisible();
        __page1 = __page1.goToCategoryLibraryPageFromManagePage();
        expect(__page1.Category_Label_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.New_Category_Type_Loc).toBeVisible({ timeout: 30000 });
        expect(__page1.Categor_Table_Coloumn_Header_Loc).toBeVisible({ timeout: 30000 });
        assertTrue(categorCount.contains("Category Type"));
    }

    public verifySelectChildCategoryFunctionality(): void {
                let __page2: any = this;
        __page2 = __page2.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page2 = __page2.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page2 = __page2.launchSkillStudio();
        __page2 = __page2.getPageClass(CategoryLibraryPage);
        __page2 = __page2.navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, CategoryLibraryPage);
        __page2 = __page2.toggleShowCategoriesButton();
        expect(__page2.Select_Child_Category_Checkbox_Loc).toBeVisible({ timeout: 30000 });
        __page2 = __page2.selectCategoryFromTable("Retail");
        __page2 = __page2.getPreviousSkillCountInCategory();
        __page2 = __page2.clickChildCategoryCheckbox();
        __page2 = __page2.getAfterSkillCountInCategory();
        assertTrue(CategoryLibraryPage.previousCount < CategoryLibraryPage.afterCount);
    }

    public verifyDeletionOfParentCategory(): void {
                let __page3: any = this;
        __page3 = __page3.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page3 = __page3.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page3 = __page3.launchSkillStudio();
        __page3 = __page3.getPageClass(CategoryLibraryPage);
        __page3 = __page3.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page3 = __page3.filterCategoryByName(this.updatedParentCatName);
        expect(__page3.Category_Detail_Page_Loc(this.updatedParentCatName)).toBeVisible();
        __page3 = __page3.deleteCategory("Delete Category Type");
        expect(__page3.Warning_Popup_Delete("Cancel")).toBeVisible();
        __page3 = __page3.deleteCategoryPermission("Cancel");
        expect(__page3.Category_Detail_Page_Loc(this.updatedParentCatName)).toBeVisible();
        __page3 = __page3.deleteCategory("Delete Category Type");
        __page3 = __page3.deleteCategoryPermission("Delete");
        expect(__page3.Category_Alert_Message("Category deleted successfully")).toBeVisible();
        expect(__page3.Category_Label_Loc).toBeVisible({ timeout: 30000 });
        expect(__page3.New_Category_Type_Loc).toBeVisible({ timeout: 30000 });
        expect(__page3.Categor_Table_Coloumn_Header_Loc).toBeVisible({ timeout: 30000 });
        assertTrue(categorCount.contains("Category Type"));
    }

    public verifyCreationOfChildCategory(): void {
                let __page4: any = this;
        __page4 = __page4.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page4 = __page4.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page4 = __page4.launchSkillStudio();
        __page4 = __page4.getPageClass(CategoryLibraryPage);
        __page4 = __page4.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page4 = __page4.filterCategoryByName(this.parentCategoryName);
        expect(__page4.Category_Detail_Page_Loc(this.parentCategoryName)).toBeVisible();
        __page4 = __page4.addChildCategoryToParentCategory(this.parentCategoryName, this.childCategoryName, "Create");
        expect(__page4.Created_Child_Category_label(this.childCategoryName,this.parentCategoryName)).toBeVisible({ timeout: 30000 });

    }

    public verifyDeletionOfChildCategory(): void {
                let __page5: any = this;
        __page5 = __page5.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page5 = __page5.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page5 = __page5.launchSkillStudio();
        __page5 = __page5.getPageClass(CategoryLibraryPage);
        __page5 = __page5.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page5 = __page5.filterCategoryByName(this.updatedParentCatName);
        expect(__page5.Category_Detail_Page_Loc(this.updatedParentCatName)).toBeVisible();
        __page5 = __page5.ExpandCategory("Open all");
        if ("Open all"=="Open all")
                {
                    expect(__page5.Created_Child_Category_label(this.updatedParentCatName,this.updateChildCategoryName)).toBeVisible({ timeout: 30000 });
                }
                else
                {
                    expect(__page5.Created_Child_Category_label(this.updatedParentCatName,this.updateChildCategoryName)).not.toBeVisible();
                }
        __page5 = __page5.ExpandCategory("Close all");
        if ("Close all"=="Open all")
                {
                    expect(__page5.Created_Child_Category_label(this.updatedParentCatName,this.updateChildCategoryName)).toBeVisible({ timeout: 30000 });
                }
                else
                {
                    expect(__page5.Created_Child_Category_label(this.updatedParentCatName,this.updateChildCategoryName)).not.toBeVisible();
                }
        __page5 = __page5.ExpandCategory("Open all");
        __page5 = __page5.deleteChildCategory(this.updatedParentCatName, this.updateChildCategoryName, "Delete Category");
        __page5 = __page5.deleteChildCategoryPermission("Delete");
        expect(__page5.Category_Alert_Message("Category deleted successfully")).toBeVisible();
        __page5 = __page5.addChildCategoryToParentCategory(this.updatedParentCatName, this.childCategoryName, "Cancel");
        expect(__page5.Category_Detail_Page_Loc(this.updatedParentCatName)).toBeVisible();
        __page5 = __page5.addChildCategoryToParentCategory(this.updatedParentCatName, this.childCategoryName, "Close");
        expect(__page5.Category_Detail_Page_Loc(this.updatedParentCatName)).toBeVisible();

    }

    public verifyUpdationOfCategory(): void {
                let __page6: any = this;
        __page6 = __page6.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page6 = __page6.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page6 = __page6.launchSkillStudio();
        __page6 = __page6.getPageClass(CategoryLibraryPage);
        __page6 = __page6.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page6 = __page6.filterCategoryByName(this.parentCategoryName);
        expect(__page6.Category_Detail_Page_Loc(this.parentCategoryName)).toBeVisible();
        __page6 = __page6.updateCategoryFromManagePage(this.parentCategoryName, this.updatedParentCatName, this.updatedCategoryDesc, "Save changes");
        expect(__page6.Category_Alert_Message("Category updated successfully")).toBeVisible();
        expect(__page6.Created_Category_label(this.updatedParentCatName)).toBeVisible({ timeout: 30000 });
        __page6 = __page6.updateCategoryFromManagePage(this.childCategoryName, this.updateChildCategoryName, this.randomCategoryDesc, "Save changes");
        expect(__page6.Category_Alert_Message("Category updated successfully")).toBeVisible();
        expect(__page6.Created_Category_label(this.updateChildCategoryName)).toBeVisible({ timeout: 30000 });

    }

    public DragAndDropCategories(): void {
                let __page7: any = this;
        __page7 = __page7.getEdcastQALogin(this.getConfig().getEdcastQAURL());
        __page7 = __page7.loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password);
        __page7 = __page7.launchSkillStudio();
        __page7 = __page7.getPageClass(CategoryLibraryPage);
        __page7 = __page7.navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage);
        __page7 = __page7.getCategoryPageHeader();
        expect(__page7.Category_Label_Loc).toBeVisible({ timeout: 30000 });
        expect(__page7.New_Category_Type_Loc).toBeVisible({ timeout: 30000 });
        expect(__page7.Categor_Table_Coloumn_Header_Loc).toBeVisible({ timeout: 30000 });
        assertTrue(categorCount.contains("Category Type"));
        __page7 = __page7.navigateToNewCategoryTypeLink(CategoryLibraryPage);
        expect(__page7.Add_Category_Popup_Loc).toBeVisible({ timeout: 30000 });
        this.pause(1000);
        __page7 = __page7.createNewCategoryType(this.parentCategoryName, "Create");
        let status: string = "enabled";
        expect(__page7.Created_Category_label(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        expect(__page7.Created_Category_Header(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        expect(__page7.Category_Status_Toggle_Button(status)).toBeVisible({ timeout: 30000 });
        expect(__page7.Save_And_Discard_Changes("Save changes")).not.toBeVisible();
        expect(__page7.Save_And_Discard_Changes("Discard changes")).toBeVisible({ timeout: 30000 });
        expect(__page7.Category_Detail_Page(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        expect(__page7.Category_Detail_Page_Loc).toBeVisible({ timeout: 30000 });
        __page7 = __page7.addChildCategoryToParentCategory(this.parentCategoryName, this.childCategoryName, "Create");
        expect(__page7.Created_Child_Category_label(this.childCategoryName,this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.addSubChildCategoryChildCategory(this.parentCategoryName, this.childCategoryName, this.randomCategoryDesc, "Create");
        expect(__page7.Created_Child_Category_label(this.randomCategoryDesc,this.childCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.addChildCategoryToParentCategory(this.parentCategoryName, this.updateChildCategoryName, "Create");
        expect(__page7.Created_Child_Category_label(this.updateChildCategoryName,this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.addSubChildCategoryChildCategory(this.parentCategoryName, this.updateChildCategoryName, this.updatedCategoryDesc, "Create");
        expect(__page7.Created_Child_Category_label(this.updatedCategoryDesc,this.updateChildCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.dragAndDropCategory(this.updateChildCategoryName, this.childCategoryName);
        expect(__page7.Category_Node_Change_Parent_Popup(this.updateChildCategoryName,this.parentCategoryName,this.childCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.handelParentChangeNodeLocationPopup(this.parentCategoryName, this.childCategoryName, this.updateChildCategoryName, "Confirm");
        __page7 = __page7.dragAndDropCategory(this.updateChildCategoryName, this.parentCategoryName);
        __page7 = __page7.handelChangeNodeLocationPopup(this.parentCategoryName, this.updateChildCategoryName, "Confirm");
        __page7 = __page7.dragAndDropCategory(this.updatedCategoryDesc, this.childCategoryName);
        expect(__page7.Category_Node_Change_Parent_Popup(this.updatedCategoryDesc,this.parentCategoryName,this.childCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.handelParentChangeNodeLocationPopup(this.parentCategoryName, this.childCategoryName, this.updatedCategoryDesc, "Confirm");
        __page7 = __page7.dragAndDropCategory(this.updatedCategoryDesc, this.updateChildCategoryName);
        __page7 = __page7.handelParentChangeNodeLocationPopup(this.parentCategoryName, this.updateChildCategoryName, this.updatedCategoryDesc, "Confirm");
        __page7 = __page7.dragAndDropCategory(this.updateChildCategoryName, this.updatedCategoryDesc);
        expect(__page7.Category_Alert_Message("Cannot drop a parent to its child")).toBeVisible();
        expect(__page7.Created_Category_label(this.parentCategoryName)).toBeVisible({ timeout: 30000 });
        __page7 = __page7.dragAndDropCategory(this.updatedCategoryDesc, this.childCategoryName);
        __page7 = __page7.handelParentChangeNodeLocationPopup(this.parentCategoryName, this.updateChildCategoryName, this.updatedCategoryDesc, "Cancel");
    }

}
