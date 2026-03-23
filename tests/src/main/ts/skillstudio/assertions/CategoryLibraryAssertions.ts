import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertTrue } from "common/testing/runtime";
import { CategoryLibraryPage } from "skillstudio/pages/CategoryLibraryPage";

export class CategoryLibraryAssertions extends BaseAssertion<CategoryLibraryPage> {

    public assertThatCategoryLabelIsPresent(): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Label_Loc).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.New_Category_Type_Loc).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.Categor_Table_Coloumn_Header_Loc).isVisible(this.isVisibleOptions);
        this.assertTrue(categorCount.contains("Category Type"));
        return this;
    }

    public assertThatAddCategoryPopupAppears(): CategoryLibraryAssertions {
        this.assertThat(this.page.Add_Category_Popup_Loc).isVisible(this.isVisibleOptions);
        this.pause(1000);
        return this;
    }

    public assertThatAddCategoryPopupDoesNotAppears(): CategoryLibraryAssertions {
        this.assertThat(this.page.Add_Category_Popup_Loc).not().isVisible();
        this.pause(1000);
        return this;
    }

    public assertThatCategoryCreatedSuccessfully(categoryName: string, action1: string, action2: string): CategoryLibraryAssertions {
        let status: string = "enabled";
        this.assertThat(this.page.Created_Category_label(categoryName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.Created_Category_Header(categoryName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.Category_Status_Toggle_Button(status)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.Save_And_Discard_Changes(action1)).not().isVisible();
        this.assertThat(this.page.Save_And_Discard_Changes(action2)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.Category_Detail_Page(categoryName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.Category_Detail_Page_Loc).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatShowCategoryButtonIsEnabled(): CategoryLibraryAssertions {
        this.assertThat(this.page.Select_Child_Category_Checkbox_Loc).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatPrevCountIsSmallerThanAfterCount(): CategoryLibraryAssertions {
        this.assertTrue(CategoryLibraryPage.previousCount < CategoryLibraryPage.afterCount);
        return this;
    }

    public assertThatPageCatoryDetailPageIsDisplayed(categoryName: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Detail_Page_Loc(categoryName)).isVisible();
        return this;
    }

    public assertThatPageConatinsWarningPopup(action: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Warning_Popup_Delete(action)).isVisible();
        return this;
    }

    public assertThatCategoryDeletedSuccessfully(message: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Alert_Message(message)).isVisible();
        return this;
    }

    public assertThatCategoryUpdateSuccessfully(message: string, updated_name: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Alert_Message(message)).isVisible();
        this.assertThat(this.page.Created_Category_label(updated_name)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCategoryStatusToggledSuccessfully(message: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Alert_Message(message)).isVisible();
        //assertThat(this.page.Created_Category_label(update_name)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertStatusOfCategoryType(categoryName: string, status: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Status_From_Table(categoryName,status)).isVisible();
        return this;
    }

    public assertThatChildCategoryCreatedSuccessfully(childCategory: string, parentCategory: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Created_Child_Category_label(parentCategory,childCategory)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChildCategoryAfterExpandAllFunctioanity(parentCategory: string, childCategory: string, action: string): CategoryLibraryAssertions {

        if (action=="Open all")
        {
            this.assertThat(this.page.Created_Child_Category_label(parentCategory,childCategory)).isVisible(this.isVisibleOptions);
        }
        else
        {
            this.assertThat(this.page.Created_Child_Category_label(parentCategory,childCategory)).not().isVisible();
        }
        return this;
    }

    public assertCategoryNodeChangePopup(subChildCategory: string, parentCategory: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Node_Change_Popup(subChildCategory,parentCategory)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertParentToOtherParentCategoryChangePopup(sourceCateogry: string, parentCategory: string, targetCategory: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Node_Change_Parent_Popup(sourceCateogry,parentCategory,targetCategory)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCategoryNodeChangeSucessfully(category: string): CategoryLibraryAssertions {
        this.assertThat(this.page.Category_Change_Verification(category)).isVisible(this.isVisibleOptions);
        return this;
    }

}
