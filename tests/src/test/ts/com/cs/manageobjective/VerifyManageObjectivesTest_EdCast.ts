import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ManageObjectiveAssertions } from "cs/assertions/ManageObjectiveAssertions";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";

export class VerifyManageObjectivesTest_EdCast extends BaseTest{
	private readonly MANAGEOBJECTIVEPATH: string[] = ["Configuration", "Manage Objectives"];
	tableHeaders: string[] = ["Objective","Number of skills","Addition date"];
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly DUPLICATE_OBJECIVE_ERRORMESSAGE: string = "You already have an existing objective with this name. Update the name below to save";
	private readonly OBJECTIVE_LANGUAGE: string = "German";
	private readonly OBJECTIVE_GLOBAL_LANGUAGE: string = "Dutch";

	 // Fully Implemented
	public verifyObjetiveCreation(): void {
		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

		  this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication("cesadmin", "popeye123")
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.check(ManageObjectiveAssertions)
			.assertThatTableHeaderEquals(this.tableHeaders)
			.endAssertion()
			.clickNewObjectiveButton()
			.changeWindowSize()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.addSkill("api")
			.addSkill("google")
			.clickSave()
			.check(ManageObjectiveAssertions)
			.assertThatObjectiveIsVisible(OBJ_TITLE)
			.endAssertion()
			.clickNewObjectiveButton()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.check(ManageObjectiveAssertions)
			.assertThatObjectiveSkillViewPopup(this.DUPLICATE_OBJECIVE_ERRORMESSAGE)
			.endAssertion()
			.logoutFromContentStudio(ManageObjectivesPage);
	}

	  // Fully Implemented
	public verifyObjectiveActionView(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);


		  this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication("cesadmin", "popeye123")
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.clickNewObjectiveButton()
			.changeWindowSize()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.addSkill("web analytics")
			.addSkill("google app engine")
			.clickSave()
		  	.clickObjectiveView(OBJ_TITLE)
		  	.check(ManageObjectiveAssertions)
		  	.assertThatObjectiveTitleViewPopup(OBJ_TITLE)
		  	.assertThatObjectiveDescrptionViewPopup(OBJ_DESCRIPTION)
		  	.assertThatObjectiveSkillViewPopup("google app engine")
		  	.assertThatObjectiveSkillViewPopup("web analytics")
		  	.endAssertion()
		  	.clickCloseViewObjective()
		  	.logoutFromContentStudio(ManageObjectivesPage);
	}

	  // Fully implemented
	public verifyObjectiveActionEdit(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);
		  const UPDATED_OBJ_TITLE: string = OBJ_TITLE+"Updated";

		  this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication("cesadmin", "popeye123")
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.clickNewObjectiveButton()
			.changeWindowSize()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.addSkill("API Security")
			.addSkill("google app engine")
			.clickSave()
		  	.clickObjectiveEdit(OBJ_TITLE)
		  	.fillObjectiveTitle(UPDATED_OBJ_TITLE)
		  	.addSkill("adobe LiveCycle")
		  	.clickSave()
		  	.clickObjectiveView(UPDATED_OBJ_TITLE)
		  	.check(ManageObjectiveAssertions)
		  	.assertThatObjectiveTitleViewPopup(UPDATED_OBJ_TITLE)
		  	.assertThatObjectiveDescrptionViewPopup(OBJ_DESCRIPTION)
		  	.assertThatObjectiveSkillViewPopup("google app engine")
		  	.assertThatObjectiveSkillViewPopup("API security")
		  	.assertThatObjectiveSkillViewPopup("adobe LiveCycle designer")
		  	.endAssertion()
		  	.clickCloseViewObjective()
		  	.logoutFromContentStudio(ManageObjectivesPage);
	}

	  //Fully implemented
	public verifyObjectiveActionDeleteYes(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

		  this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication("cesadmin", "popeye123")
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.clickNewObjectiveButton()
			.changeWindowSize()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.clickSave()
			.clickObjectiveDelete(OBJ_TITLE)
			.clickDeleteObjectiveYes()
			.check(ManageObjectiveAssertions)
			.assertThatObjectiveIsNotPresent(OBJ_TITLE)
			.endAssertion()
			.logoutFromContentStudio(ManageObjectivesPage);
	}

	public verifyObjectiveActionDeleteNo(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

		  this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication("cesadmin", "popeye123")
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.clickNewObjectiveButton()
			.changeWindowSize()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.clickSave()
			.clickObjectiveDelete(OBJ_TITLE)
			.clickDeleteObjectiveNo()
			.check(ManageObjectiveAssertions)
			.assertThatObjectiveIsVisible(OBJ_TITLE)
			.endAssertion()
			.logoutFromContentStudio(ManageObjectivesPage);
	}

	public verifyObjectiveCreationNonEnglish(): void {
		let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

		  this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication("cesadmin", "popeye123")
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.clickNewObjectiveButton()
			.changeWindowSize()
			.clickObjectiveLanguageDownArrow()
			.selectObjectiveLanguage(this.OBJECTIVE_LANGUAGE)
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.clickSave();
	}
}
