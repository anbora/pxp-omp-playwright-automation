// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertTrue } from "common/testing/runtime";
import { CategoryLibraryPage } from "skillstudio/pages/CategoryLibraryPage";
import { expect } from "common/testing/playwright";

export class CategoryLibraryAssertions extends BaseAssertion<CategoryLibraryPage> {

    public assertThatCategoryLabelIsPresent(): CategoryLibraryAssertions {
        expect(this.page.Category_Label_Loc).toBeVisible(this.isVisibleOptions);
        expect(this.page.New_Category_Type_Loc).toBeVisible(this.isVisibleOptions);
        expect(this.page.Categor_Table_Coloumn_Header_Loc).toBeVisible(this.isVisibleOptions);
        this.assertTrue(categorCount.contains("Category Type"));
        return this;
    }

    public assertThatAddCategoryPopupAppears(): CategoryLibraryAssertions {
        expect(this.page.Add_Category_Popup_Loc).toBeVisible(this.isVisibleOptions);
        this.pause(1000);
        return this;
    }

    public assertThatAddCategoryPopupDoesNotAppears(): CategoryLibraryAssertions {
        expect(this.page.Add_Category_Popup_Loc).not.toBeVisible();
        this.pause(1000);
        return this;
    }

    public assertThatCategoryCreatedSuccessfully(categoryName: string, action1: string, action2: string): CategoryLibraryAssertions {
        let status: string = "enabled";
        expect(this.page.Created_Category_label(categoryName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.Created_Category_Header(categoryName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.Category_Status_Toggle_Button(status)).toBeVisible(this.isVisibleOptions);
        expect(this.page.Save_And_Discard_Changes(action1)).not.toBeVisible();
        expect(this.page.Save_And_Discard_Changes(action2)).toBeVisible(this.isVisibleOptions);
        expect(this.page.Category_Detail_Page(categoryName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.Category_Detail_Page_Loc).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatShowCategoryButtonIsEnabled(): CategoryLibraryAssertions {
        expect(this.page.Select_Child_Category_Checkbox_Loc).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatPrevCountIsSmallerThanAfterCount(): CategoryLibraryAssertions {
        this.assertTrue(CategoryLibraryPage.previousCount < CategoryLibraryPage.afterCount);
        return this;
    }

    public assertThatPageCatoryDetailPageIsDisplayed(categoryName: string): CategoryLibraryAssertions {
        expect(this.page.Category_Detail_Page_Loc(categoryName)).toBeVisible();
        return this;
    }

    public assertThatPageConatinsWarningPopup(action: string): CategoryLibraryAssertions {
        expect(this.page.Warning_Popup_Delete(action)).toBeVisible();
        return this;
    }

    public assertThatCategoryDeletedSuccessfully(message: string): CategoryLibraryAssertions {
        expect(this.page.Category_Alert_Message(message)).toBeVisible();
        return this;
    }

    public assertThatCategoryUpdateSuccessfully(message: string, updated_name: string): CategoryLibraryAssertions {
        expect(this.page.Category_Alert_Message(message)).toBeVisible();
        expect(this.page.Created_Category_label(updated_name)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCategoryStatusToggledSuccessfully(message: string): CategoryLibraryAssertions {
        expect(this.page.Category_Alert_Message(message)).toBeVisible();
        //expect(this.page.Created_Category_label(update_name)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertStatusOfCategoryType(categoryName: string, status: string): CategoryLibraryAssertions {
        expect(this.page.Category_Status_From_Table(categoryName,status)).toBeVisible();
        return this;
    }

    public assertThatChildCategoryCreatedSuccessfully(childCategory: string, parentCategory: string): CategoryLibraryAssertions {
        expect(this.page.Created_Child_Category_label(parentCategory,childCategory)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChildCategoryAfterExpandAllFunctioanity(parentCategory: string, childCategory: string, action: string): CategoryLibraryAssertions {

        if (action=="Open all")
        {
            expect(this.page.Created_Child_Category_label(parentCategory,childCategory)).toBeVisible(this.isVisibleOptions);
        }
        else
        {
            expect(this.page.Created_Child_Category_label(parentCategory,childCategory)).not.toBeVisible();
        }
        return this;
    }

    public assertCategoryNodeChangePopup(subChildCategory: string, parentCategory: string): CategoryLibraryAssertions {
        expect(this.page.Category_Node_Change_Popup(subChildCategory,parentCategory)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertParentToOtherParentCategoryChangePopup(sourceCateogry: string, parentCategory: string, targetCategory: string): CategoryLibraryAssertions {
        expect(this.page.Category_Node_Change_Parent_Popup(sourceCateogry,parentCategory,targetCategory)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCategoryNodeChangeSucessfully(category: string): CategoryLibraryAssertions {
        expect(this.page.Category_Change_Verification(category)).toBeVisible(this.isVisibleOptions);
        return this;
    }

}
