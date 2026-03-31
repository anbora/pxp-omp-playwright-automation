// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { expect } from "common/testing/playwright";

export class VerifyManageObjectivesTest_SBX extends BaseTest{
	private readonly MANAGEOBJECTIVEPATH: string[] = ["Configuration", "Manage Objectives"];
	tableHeaders: string[] = ["Objective","Number of skills","Addition date"];
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly DUPLICATE_OBJECIVE_ERRORMESSAGE: string = "You already have an existing objective with this name. Update the name below to save";//"Objective name is already in use; please choose another name.";
	private readonly OBJECTIVE_LANGUAGE: string = "German";
	private readonly OBJECTIVE_GLOBAL_LANGUAGE: string = "Dutch";


	 // Fully Implemented
	public verifyObjetiveCreation(): void {
		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

			   let __page1: any = this;
   __page1 = __page1.getCsLoginPage(this.getConfig().getSbxurl());
   __page1 = __page1.logintoSBX("CSUSERFIVE", "welcome");
   __page1 = __page1.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
   expect(__page1.objectiveTableHeader).toContainText(this.tableHeaders);
   __page1 = __page1.clickNewObjectiveButton();
   __page1 = __page1.changeWindowSize();
   __page1 = __page1.fillObjectiveTitle(OBJ_TITLE);
   __page1 = __page1.fillObjectiveDescription(OBJ_DESCRIPTION);
   __page1 = __page1.clickContinue();
   __page1 = __page1.addSkill("api");
   __page1 = __page1.addSkill("google");
   __page1 = __page1.clickSave();
   expect(__page1.ObjectiveView(OBJ_TITLE)).toBeVisible({ timeout: 60000 });
   __page1 = __page1.clickNewObjectiveButton();
   __page1 = __page1.fillObjectiveTitle(OBJ_TITLE);
   __page1 = __page1.fillObjectiveDescription(OBJ_DESCRIPTION);
   if(this.DUPLICATE_OBJECIVE_ERRORMESSAGE.equals("communication")) {
   			expect(__page1.badge_check(this.DUPLICATE_OBJECIVE_ERRORMESSAGE)).toBeVisible({ timeout: 60000 });
   		}
   		else {
   			expect(__page1.objSkillViewPopup(this.DUPLICATE_OBJECIVE_ERRORMESSAGE)).toBeVisible({ timeout: 60000 });
   		}
			//.logoutFromContentStudio(ManageObjectivesPage);
	}

	  // Fully Implemented
	public verifyObjectiveActionView(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);


			   let __page2: any = this;
   __page2 = __page2.getCsLoginPage(this.getConfig().getSbxurl());
   __page2 = __page2.logintoSBX("CSUSERFIVE", "welcome");
   __page2 = __page2.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
   __page2 = __page2.clickNewObjectiveButton();
   __page2 = __page2.changeWindowSize();
   __page2 = __page2.fillObjectiveTitle(OBJ_TITLE);
   __page2 = __page2.fillObjectiveDescription(OBJ_DESCRIPTION);
   __page2 = __page2.clickContinue();
   __page2 = __page2.addSkill("api");
   __page2 = __page2.addSkill("google app engine");
   __page2 = __page2.clickSave();
   __page2 = __page2.clickObjectiveView(OBJ_TITLE);
   expect(__page2.objTitleViewPopup(OBJ_TITLE)).toBeVisible({ timeout: 60000 });
   expect(__page2.objDescriptionViewPopup(OBJ_DESCRIPTION)).toBeVisible({ timeout: 60000 });
   if("google app engine".equals("communication")) {
   			expect(__page2.badge_check("google app engine")).toBeVisible({ timeout: 60000 });
   		}
   		else {
   			expect(__page2.objSkillViewPopup("google app engine")).toBeVisible({ timeout: 60000 });
   		}
   __page2 = __page2.clickCloseViewObjective();
		  	//.logoutFromContentStudio(ManageObjectivesPage);
	}

	  // Fully implemented
	public verifyObjectiveActionEdit(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);
		  const UPDATED_OBJ_TITLE: string = OBJ_TITLE+"Updated";

			   let __page3: any = this;
   __page3 = __page3.getCsLoginPage(this.getConfig().getSbxurl());
   __page3 = __page3.logintoSBX("CSUSERFIVE", "welcome");
   __page3 = __page3.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
   __page3 = __page3.clickNewObjectiveButton();
   __page3 = __page3.changeWindowSize();
   __page3 = __page3.fillObjectiveTitle(OBJ_TITLE);
   __page3 = __page3.fillObjectiveDescription(OBJ_DESCRIPTION);
   __page3 = __page3.clickContinue();
   __page3 = __page3.addSkill("API Security");
   __page3 = __page3.addSkill("google app engine");
   __page3 = __page3.clickSave();
   __page3 = __page3.clickObjectiveEdit(OBJ_TITLE);
   __page3 = __page3.fillObjectiveTitle(UPDATED_OBJ_TITLE);
   __page3 = __page3.addSkill("adobe LiveCycle");
   __page3 = __page3.clickSave();
   __page3 = __page3.clickObjectiveView(UPDATED_OBJ_TITLE);
   expect(__page3.objTitleViewPopup(UPDATED_OBJ_TITLE)).toBeVisible({ timeout: 60000 });
   expect(__page3.objDescriptionViewPopup(OBJ_DESCRIPTION)).toBeVisible({ timeout: 60000 });
   if("google app engine".equals("communication")) {
   			expect(__page3.badge_check("google app engine")).toBeVisible({ timeout: 60000 });
   		}
   		else {
   			expect(__page3.objSkillViewPopup("google app engine")).toBeVisible({ timeout: 60000 });
   		}
   if("API security".equals("communication")) {
   			expect(__page3.badge_check("API security")).toBeVisible({ timeout: 60000 });
   		}
   		else {
   			expect(__page3.objSkillViewPopup("API security")).toBeVisible({ timeout: 60000 });
   		}
   if("adobe LiveCycle designer".equals("communication")) {
   			expect(__page3.badge_check("adobe LiveCycle designer")).toBeVisible({ timeout: 60000 });
   		}
   		else {
   			expect(__page3.objSkillViewPopup("adobe LiveCycle designer")).toBeVisible({ timeout: 60000 });
   		}
   __page3 = __page3.clickCloseViewObjective();
		  	//.logoutFromContentStudio(ManageObjectivesPage);
	}

	  //Fully implemented
	public verifyObjectiveActionDeleteYes(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

			   let __page4: any = this;
   __page4 = __page4.getCsLoginPage(this.getConfig().getSbxurl());
   __page4 = __page4.logintoSBX("CSUSERFIVE", "welcome");
   __page4 = __page4.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
   __page4 = __page4.clickNewObjectiveButton();
   __page4 = __page4.changeWindowSize();
   __page4 = __page4.fillObjectiveTitle(OBJ_TITLE);
   __page4 = __page4.fillObjectiveDescription(OBJ_DESCRIPTION);
   __page4 = __page4.clickContinue();
   __page4 = __page4.clickSave();
   __page4 = __page4.clickObjectiveDelete(OBJ_TITLE);
   __page4 = __page4.clickDeleteObjectiveYes();
   expect(__page4.ObjectiveView(OBJ_TITLE)).toHaveCount(0);
			//.logoutFromContentStudio(ManageObjectivesPage);
	}

	public verifyObjectiveActionDeleteNo(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

			   let __page5: any = this;
   __page5 = __page5.getCsLoginPage(this.getConfig().getSbxurl());
   __page5 = __page5.logintoSBX("CSUSERFIVE", "welcome");
   __page5 = __page5.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
   __page5 = __page5.clickNewObjectiveButton();
   __page5 = __page5.changeWindowSize();
   __page5 = __page5.fillObjectiveTitle(OBJ_TITLE);
   __page5 = __page5.fillObjectiveDescription(OBJ_DESCRIPTION);
   __page5 = __page5.clickContinue();
   __page5 = __page5.clickSave();
   __page5 = __page5.clickObjectiveDelete(OBJ_TITLE);
   __page5 = __page5.clickDeleteObjectiveNo();
   expect(__page5.ObjectiveView(OBJ_TITLE)).toBeVisible({ timeout: 60000 });
			//.logoutFromContentStudio(ManageObjectivesPage);
	}

	public verifyObjectiveCreationGlobalIcon(): void {

		  let today: any = new Date();
		  const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		  const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

			this.getCsLoginPage(this.getConfig().getSbxurl())
			.logintoSBX("CSUSERFIVE", "welcome")
			.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
			.clickNewObjectiveButton()
			.changeWindowSize()
			.fillObjectiveTitle(OBJ_TITLE)
			.fillObjectiveDescription(OBJ_DESCRIPTION)
			.clickContinue()
			.clickTitleLanguageIcon()
			.clickAddAnotherLanguage()
			.selectGlobalLanguage(this.OBJECTIVE_GLOBAL_LANGUAGE)
			.fillLanguageName(this.OBJECTIVE_GLOBAL_LANGUAGE)
			.clickTranslateSave()
			.clickDescriptionLanguageIcon()
			.clickAddAnotherLanguage()
			.selectGlobalLanguage(this.OBJECTIVE_GLOBAL_LANGUAGE)
			.fillLanguageName(this.OBJECTIVE_GLOBAL_LANGUAGE)
			.clickTranslateSave()
			.clickSave();
	}

	public verifyObjectiveCreationNonEnglish(): void {
		let today: any = new Date();
		const OBJ_TITLE: string = "OBLTITLEPL_"+this.dfor.format(today);
		const OBJ_DESCRIPTION: string = "OBJDES_PL"+this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERFIVE", "welcome")
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

	public verifyNeedInspirationObjetiveCreation(): void {

		//String OBJECTIVE_NAME="Communicate effectively";
		let OBJECTIVE_TITLE: string = "Communicate Effectively";
		let SKILL_EFFECTIVE_COMMUNICATION: string = "effective communication";
		let SKILL_PUBLIC_SPEAKING: string = "public speaking";
		let SKILL_PRESENTATION_SKILLS: string = "presentation skills";
		let SKILL_COMMUNICATION: string = "communication";
		let SKILL_LISTENING_SKILLS: string = "listening skills";

		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getSbxurl());
  __page6 = __page6.logintoSBX("CSUSERFIVE", "welcome");
  __page6 = __page6.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
  expect(__page6.objectiveTableHeader).toContainText(this.tableHeaders);
  expect(__page6.needInspirations_Text).toBeVisible({ timeout: 60000 });
  expect(__page6.needInspirations).toBeVisible({ timeout: 60000 });
  __page6 = __page6.clickNeedInspirations();
  __page6 = __page6.clickNeedInspirationsEye(OBJECTIVE_TITLE);
  expect(__page6.objTitleViewPopup(OBJECTIVE_TITLE)).toBeVisible({ timeout: 60000 });
  if(SKILL_EFFECTIVE_COMMUNICATION.equals("communication")) {
  			expect(__page6.badge_check(SKILL_EFFECTIVE_COMMUNICATION)).toBeVisible({ timeout: 60000 });
  		}
  		else {
  			expect(__page6.objSkillViewPopup(SKILL_EFFECTIVE_COMMUNICATION)).toBeVisible({ timeout: 60000 });
  		}
  if(SKILL_PUBLIC_SPEAKING.equals("communication")) {
  			expect(__page6.badge_check(SKILL_PUBLIC_SPEAKING)).toBeVisible({ timeout: 60000 });
  		}
  		else {
  			expect(__page6.objSkillViewPopup(SKILL_PUBLIC_SPEAKING)).toBeVisible({ timeout: 60000 });
  		}
  if(SKILL_PRESENTATION_SKILLS.equals("communication")) {
  			expect(__page6.badge_check(SKILL_PRESENTATION_SKILLS)).toBeVisible({ timeout: 60000 });
  		}
  		else {
  			expect(__page6.objSkillViewPopup(SKILL_PRESENTATION_SKILLS)).toBeVisible({ timeout: 60000 });
  		}
  if(SKILL_COMMUNICATION.equals("communication")) {
  			expect(__page6.badge_check(SKILL_COMMUNICATION)).toBeVisible({ timeout: 60000 });
  		}
  		else {
  			expect(__page6.objSkillViewPopup(SKILL_COMMUNICATION)).toBeVisible({ timeout: 60000 });
  		}
  if(SKILL_LISTENING_SKILLS.equals("communication")) {
  			expect(__page6.badge_check(SKILL_LISTENING_SKILLS)).toBeVisible({ timeout: 60000 });
  		}
  		else {
  			expect(__page6.objSkillViewPopup(SKILL_LISTENING_SKILLS)).toBeVisible({ timeout: 60000 });
  		}
  __page6 = __page6.clickCloseViewObjective();
  __page6 = __page6.clickNeedInspirationsAdd(OBJECTIVE_TITLE);
  expect(__page6.ObjSuccessMessage(OBJECTIVE_TITLE)).toBeVisible({ timeout: 60000 });
  __page6 = __page6.waitForTime(5000);
  __page6 = __page6.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
  __page6 = __page6.clickObjectiveDelete(OBJECTIVE_TITLE);
  __page6 = __page6.clickDeleteObjectiveYes();
	}

	public verifyStickyHeaders(): void {
		let headerName: string = "Manage Objectives";

		  let __page7: any = this;
  __page7 = __page7.getCsLoginPage(this.getConfig().getSbxurl());
  __page7 = __page7.logintoSBX("CSUSERFIVE", "welcome");
  __page7 = __page7.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage);
  __page7 = __page7.scrolltoBottom("2000", ManageObjectivesPage);
  expect(__page7.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
  __page7 = __page7.scrolltoBottom("Downmost", ManageObjectivesPage);
  expect(__page7.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
	}
}
