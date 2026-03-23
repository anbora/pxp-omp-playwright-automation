import { ValidateUploadSkillTemplateTest } from "com/skillstudio/ValidateUploadSkillTemplateTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CategoryLibraryAssertions } from "skillstudio/assertions/CategoryLibraryAssertions";
import { CategoryLibraryPage } from "skillstudio/pages/CategoryLibraryPage";

export class VerifyCreationOfNewCategoryTest extends BaseTest {
    new_category_nav_path: string[] = ["Libraries", "Skills", "Categories"];
    parentCategoryName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    updatedParentCatName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    childCategoryName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    updateChildCategoryName: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    randomCategoryDesc: string = ValidateUploadSkillTemplateTest.generateRandomString(5);
    updatedCategoryDesc: string = ValidateUploadSkillTemplateTest.generateRandomString(5);

    public verifyCreationOfNewCategory(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .getCategoryPageHeader()
                .check(CategoryLibraryAssertions)
                .assertThatCategoryLabelIsPresent()
                .endAssertion()
                .navigateToNewCategoryTypeLink(CategoryLibraryPage)
                .check(CategoryLibraryAssertions)
                .assertThatAddCategoryPopupAppears()
                .endAssertion()
                .cancelNewCategory("Cancel")
                .check(CategoryLibraryAssertions)
                .assertThatAddCategoryPopupDoesNotAppears()
                .endAssertion()
                .navigateToNewCategoryTypeLink(CategoryLibraryPage)
                .check(CategoryLibraryAssertions)
                .assertThatAddCategoryPopupAppears()
                .endAssertion()
                .createNewCategoryType(this.parentCategoryName, "Create")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryCreatedSuccessfully(this.parentCategoryName,"Save changes","Discard changes")
                .endAssertion()
                .updateCateogoryDescription(this.randomCategoryDesc,"Save changes")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryUpdateSuccessfully("Category updated successfully",this.parentCategoryName)
                .endAssertion()
                .toggleCategoryTypeStatus("enabled","Save Changes")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryStatusToggledSuccessfully("Category updated successfully")
                .endAssertion()
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .searchCategoryByCategoryName(this.parentCategoryName)
                .check(CategoryLibraryAssertions)
                .assertStatusOfCategoryType(this.parentCategoryName,"disabled")
                .endAssertion()
                .goToCategoryLibraryPageFromManagePage()
                .check(CategoryLibraryAssertions)
                .assertThatCategoryLabelIsPresent()
                .endAssertion()
        ;
    }

    public verifySelectChildCategoryFunctionality(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(ValidateUploadSkillTemplateTest.search_skills_nav_path, CategoryLibraryPage)
                .toggleShowCategoriesButton()
                .check(CategoryLibraryAssertions)
                .assertThatShowCategoryButtonIsEnabled()
                .endAssertion()
                .selectCategoryFromTable("Retail")
                .getPreviousSkillCountInCategory()
                .clickChildCategoryCheckbox()
                .getAfterSkillCountInCategory()
                .check(CategoryLibraryAssertions)
                .assertThatPrevCountIsSmallerThanAfterCount()
                .endAssertion();
    }

    public verifyDeletionOfParentCategory(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .filterCategoryByName(this.updatedParentCatName)
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.updatedParentCatName)
                .endAssertion()
                .deleteCategory("Delete Category Type")
                .check(CategoryLibraryAssertions)
                .assertThatPageConatinsWarningPopup("Cancel")
                .endAssertion()
                .deleteCategoryPermission("Cancel")
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.updatedParentCatName)
                .endAssertion()
                .deleteCategory("Delete Category Type")
                .deleteCategoryPermission("Delete")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryDeletedSuccessfully("Category deleted successfully")
                .assertThatCategoryLabelIsPresent()
                .endAssertion();
    }

    public verifyCreationOfChildCategory(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .filterCategoryByName(this.parentCategoryName)
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.parentCategoryName)
                .endAssertion()
                .addChildCategoryToParentCategory(this.parentCategoryName,this.childCategoryName,"Create")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryCreatedSuccessfully(this.parentCategoryName,this.childCategoryName)
                .endAssertion();

    }

    public verifyDeletionOfChildCategory(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .filterCategoryByName(this.updatedParentCatName)
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.updatedParentCatName)
                .endAssertion()
                .ExpandCategory("Open all")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryAfterExpandAllFunctioanity(this.updatedParentCatName,this.updateChildCategoryName,"Open all")
                .endAssertion()
                .ExpandCategory("Close all")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryAfterExpandAllFunctioanity(this.updatedParentCatName,this.updateChildCategoryName,"Close all")
                .endAssertion()
                .ExpandCategory("Open all")
                .deleteChildCategory(this.updatedParentCatName,this.updateChildCategoryName,"Delete Category")
                .deleteChildCategoryPermission("Delete")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryDeletedSuccessfully("Category deleted successfully")
                .endAssertion()
                .addChildCategoryToParentCategory(this.updatedParentCatName,this.childCategoryName,"Cancel")
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.updatedParentCatName)
                .endAssertion()
                .addChildCategoryToParentCategory(this.updatedParentCatName,this.childCategoryName,"Close")
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.updatedParentCatName)
                .endAssertion();

    }

    public verifyUpdationOfCategory(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .filterCategoryByName(this.parentCategoryName)
                .check(CategoryLibraryAssertions)
                .assertThatPageCatoryDetailPageIsDisplayed(this.parentCategoryName)
                .endAssertion()
                .updateCategoryFromManagePage(this.parentCategoryName,this.updatedParentCatName,this.updatedCategoryDesc,"Save changes")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryUpdateSuccessfully("Category updated successfully",this.updatedParentCatName)
                .endAssertion()
                .updateCategoryFromManagePage(this.childCategoryName,this.updateChildCategoryName,this.randomCategoryDesc,"Save changes")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryUpdateSuccessfully("Category updated successfully",this.updateChildCategoryName)
                .endAssertion()

               ;

    }

    public DragAndDropCategories(): void {
        this.getEdcastQALogin(this.getConfig().getEdcastQAURL())
                .loginToEdcastQASkillsOrg(this.getEdcastQAAdminUser().email, this.getEdcastQAAdminUser().password)
                .launchSkillStudio()
                .getPageClass(CategoryLibraryPage)
                .navigateHumbergenMenu(this.new_category_nav_path, CategoryLibraryPage)
                .getCategoryPageHeader()
                .check(CategoryLibraryAssertions)
                .assertThatCategoryLabelIsPresent()
                .endAssertion()
                .navigateToNewCategoryTypeLink(CategoryLibraryPage)
                .check(CategoryLibraryAssertions)
                .assertThatAddCategoryPopupAppears()
                .endAssertion()
                .createNewCategoryType(this.parentCategoryName, "Create")
                .check(CategoryLibraryAssertions)
                .assertThatCategoryCreatedSuccessfully(this.parentCategoryName,"Save changes","Discard changes")
                .endAssertion()
                .addChildCategoryToParentCategory(this.parentCategoryName,this.childCategoryName,"Create")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryCreatedSuccessfully(this.parentCategoryName,this.childCategoryName)
                .endAssertion()
                .addSubChildCategoryChildCategory(this.parentCategoryName,this.childCategoryName,this.randomCategoryDesc,"Create")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryCreatedSuccessfully(this.childCategoryName,this.randomCategoryDesc)
                .endAssertion()
                .addChildCategoryToParentCategory(this.parentCategoryName,this.updateChildCategoryName,"Create")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryCreatedSuccessfully(this.parentCategoryName,this.updateChildCategoryName)
                .endAssertion()
                .addSubChildCategoryChildCategory(this.parentCategoryName,this.updateChildCategoryName,this.updatedCategoryDesc,"Create")
                .check(CategoryLibraryAssertions)
                .assertThatChildCategoryCreatedSuccessfully(this.updateChildCategoryName,this.updatedCategoryDesc)
                .endAssertion()
                .dragAndDropCategory(this.updateChildCategoryName ,this.childCategoryName)
                .check(CategoryLibraryAssertions)
                .assertParentToOtherParentCategoryChangePopup(this.updateChildCategoryName,this.parentCategoryName,this.childCategoryName)
                .endAssertion()
                .handelParentChangeNodeLocationPopup(this.parentCategoryName,this.childCategoryName,this.updateChildCategoryName,"Confirm")
                .dragAndDropCategory(this.updateChildCategoryName ,this.parentCategoryName)
                .handelChangeNodeLocationPopup(this.parentCategoryName,this.updateChildCategoryName,"Confirm")
                .dragAndDropCategory(this.updatedCategoryDesc ,this.childCategoryName)
                .check(CategoryLibraryAssertions)
                .assertParentToOtherParentCategoryChangePopup(this.updatedCategoryDesc,this.parentCategoryName,this.childCategoryName)
                .endAssertion()
                .handelParentChangeNodeLocationPopup(this.parentCategoryName,this.childCategoryName,this.updatedCategoryDesc,"Confirm")
                .dragAndDropCategory(this.updatedCategoryDesc ,this.updateChildCategoryName)
                .handelParentChangeNodeLocationPopup(this.parentCategoryName,this.updateChildCategoryName,this.updatedCategoryDesc,"Confirm")
                .dragAndDropCategory(this.updateChildCategoryName ,this.updatedCategoryDesc)
                .check(CategoryLibraryAssertions)
                .assertThatCategoryUpdateSuccessfully("Cannot drop a parent to its child",this.parentCategoryName)
                .endAssertion()
                .dragAndDropCategory(this.updatedCategoryDesc ,this.childCategoryName)
                .handelParentChangeNodeLocationPopup(this.parentCategoryName,this.updateChildCategoryName,this.updatedCategoryDesc,"Cancel")

        ;
    }

}
