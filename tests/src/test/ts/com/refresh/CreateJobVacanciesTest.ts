import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { Location } from "models/job/Location";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateJobVacanciesTest extends BaseRestTest {

    private readonly guineaPigStylist: string = "Guinea Pig Stylist";
    private readonly miceStylist: string = "Mice Stylist";
    private readonly marmotStylist: string = "Marmot Stylist";
    private readonly chipmunkStylist: string = "Chipmunk Stylist";
    private readonly headOfDevelopmentInLumesse: string = "Head of Development in Lumesse";
    private readonly devOpsAzureSolutionArchitect: string = "DevOps Azure Solution Architect";
    private readonly devSecOpsLead: string = "DevSecOps Lead";
    private readonly insectBeautician: string = "Insect Beautician";
    private readonly paranormalTourGuide: string = "Paranormal Tour Guide";
    private readonly bikeFisher: string = "Bike Fisher";
    private readonly homeworkSolver: string = "Homework Solver";
    private readonly catWhisperer: string = "Cat Whisperer";
    private readonly bedHeater: string = "Bed Heater";
    private readonly elephantStylist: string = "Elephant Stylist";
    private readonly fishCounter: string = "Fish Counter";
    private readonly golfBallSeeker: string = "Golf Ball Seeker";
    private readonly snakeMilker: string = "Snake Milker";
    private readonly roadMime: string = "Road Mime";
    private readonly mermaid: string = "Mermaid";
    private readonly babysitterForChildActors: string = "Babysitter For Child Actors";
    private readonly dogFoodTester: string = "Dog Food Tester";
    private readonly fluffCollector: string = "Fluff Collector";
    private readonly passengerStuffer: string = "Passenger Stuffer";
    private readonly jobWithPostingDateInThePast: string = "Posting Date In The Past";
    private readonly strikerFootballPlayer: string = "Striker - football player";
    private readonly coinSelector: string = "Coin Selector";

    private readonly sudoku: string = "sudoku";
    private readonly cardGames: string = "card games";
    private readonly jobId1: string = "constantRestassureJob1";
    private readonly jobId2: string = "constantRestassureJob2";
    private readonly jobId3: string = "constantRestassureJob3";
    private readonly jobId4: string = "constantRestassureJob4";
    private readonly jobId5: string = "constantRestassureJob5";
    private readonly jobId6: string = "constantRestassureJob6";
    private readonly jobId7: string = "constantRestassureJob7";
    private readonly jobId8: string = "constantRestassureJob8";
    private readonly jobId9: string = "constantRestassureJob9";
    private readonly jobId10: string = "constantRestassureJob10";
    private readonly jobId11: string = "constantRestassureJob11";
    private readonly jobId12: string = "constantRestassureJob12";
    private readonly jobId13: string = "constantRestassureJob13";
    private readonly jobId14: string = "constantRestassureJob14";
    private readonly jobId15: string = "constantRestassureJob15";
    private readonly jobId16: string = "constantRestassureJob16";
    private readonly jobId17: string = "constantRestassureJob17";
    private readonly jobId18: string = "constantRestassureJob18";
    private readonly jobId19: string = "constantRestassureJob19";
    private readonly jobId20: string = "constantRestassureJob20";
    private readonly jobId21: string = "constantRestassureJob21";
    private readonly jobId22: string = "constantRestassureJob22";
    private readonly jobId23: string = "constantRestassureJob23";
    private readonly jobId24: string = "constantRestassureJob24";
    private readonly jobId25: string = "constantRestassureJob25";
    private readonly jobId26: string = "constantRestassureJob26";

    private user: UserModel;
    private jobModel: JobModel;
    private jobModel2: JobModel;
    private jobModel3: JobModel;
    private jobModel4: JobModel;

    public initialize(): void {
      this.user = this.createUser();
      this.jobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        let linkedRolesList: Array<LinkedRole> = this.jobModel.getLinkedRoles();
        linkedRolesList.get(0).setInternalId("");
        linkedRolesList.get(0).setExternalId("rodentsrole");
        this.jobModel.setLinkedRoles(linkedRolesList);
        this.jobModel.setId(this.jobId1);
        this.createJob(this.guineaPigStylist, this.jobModel, false);
        this.jobModel.setId(this.jobId2);
        this.createJob(this.miceStylist, this.jobModel, false);
        this.jobModel.setId(this.jobId3);
        this.createJob(this.marmotStylist, this.jobModel, false);

        let location: Array<Location> = this.jobModel.getLocation();
        location.get(0).setLocationId("");
        this.jobModel.setLocation(location);
        this.jobModel.setRemote("REMOTE");
        this.jobModel.setContractType("PERMANENT");
        this.jobModel.setId(this.jobId4);
        this.createJob(this.chipmunkStylist, this.jobModel, false);

      this.jobModel2 = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobDescriptionList: Array<JobDescription> = this.jobModel2.getJobDescriptions();
        this.jobModel2.setLevel("ENTRY_LEVEL");
        this.jobModel2.setContractType("PERMANENT");
        jobDescriptionList.get(0).setReferralURL("");
        jobDescriptionList.get(0).setApplyURL("");
        this.jobModel2.setJobDescriptions(jobDescriptionList);
        this.jobModel2.setId(this.jobId5);
        this.createJob(this.headOfDevelopmentInLumesse, this.jobModel2, false);

        this.jobModel2.setLevel("MID_SENIOR");
        this.jobModel2.setJobDescriptions(jobDescriptionList);
        this.jobModel2.setId(this.jobId6);
        this.createJob(this.devOpsAzureSolutionArchitect, this.jobModel2, false);

        jobDescriptionList.get(0).setJobDetailsURL("");
        jobDescriptionList.get(0).setApplyURL("https://fake.apply.csod.com");
        this.jobModel2.setJobDescriptions(jobDescriptionList);
        this.jobModel2.setId(this.jobId7);
        this.createJob(this.devSecOpsLead, this.jobModel2, false);

      this.jobModel3 = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        let linkedRolesList2: Array<LinkedRole> = this.jobModel3.getLinkedRoles();
        linkedRolesList2.get(0).setInternalId("");
        linkedRolesList2.get(0).setExternalId("unusualsrole");
        this.jobModel3.setLinkedRoles(linkedRolesList2);
        this.jobModel3.setId(this.jobId8);
        this.createJob(this.insectBeautician, this.jobModel3, false);
        this.jobModel3.setId(this.jobId9);
        this.createJob(this.paranormalTourGuide, this.jobModel3, false);
        this.jobModel3.setId(this.jobId10);
        this.createJob(this.bikeFisher, this.jobModel3, false);
        this.jobModel3.setId(this.jobId11);
        this.createJob(this.homeworkSolver, this.jobModel3, false);
        this.jobModel3.setId(this.jobId12);
        this.createJob(this.catWhisperer, this.jobModel3, false);
        this.jobModel3.setId(this.jobId13);
        this.createJob(this.bedHeater, this.jobModel3, false);
        this.jobModel3.setId(this.jobId14);
        this.createJob(this.elephantStylist, this.jobModel3, false);
        this.jobModel3.setId(this.jobId15);
        this.createJob(this.fishCounter, this.jobModel3, false);
        this.jobModel3.setId(this.jobId16);
        this.createJob(this.golfBallSeeker, this.jobModel3, false);
        this.jobModel3.setId(this.jobId17);
        this.createJob(this.snakeMilker, this.jobModel3, false);
        this.jobModel3.setId(this.jobId18);
        this.createJob(this.roadMime, this.jobModel3, false);
        this.jobModel3.setId(this.jobId19);
        this.createJob(this.mermaid, this.jobModel3, false);
        this.jobModel3.setId(this.jobId20);
        this.createJob(this.babysitterForChildActors, this.jobModel3, false);
        this.jobModel3.setId(this.jobId21);
        this.createJob(this.dogFoodTester, this.jobModel3, false);
        this.jobModel3.setId(this.jobId22);
        this.createJob(this.fluffCollector, this.jobModel3, false);
        this.jobModel3.setId(this.jobId23);
        this.createJob(this.passengerStuffer, this.jobModel3, false);
        this.jobModel3.setId(this.jobId26);
        this.createJob(this.coinSelector, this.jobModel3, false);

      this.jobModel4 = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        this.jobModel4.setStartDateTime("2021-01-01T00:00:00.00Z");
        this.jobModel4.setId(this.jobId24);
        this.createJob(this.jobWithPostingDateInThePast, this.jobModel4, false);

        this.jobModel4.setStartDateTime("2022-01-01T00:00:00.00Z");
        this.jobModel4.setId(this.jobId25);
        this.createJob(this.strikerFootballPlayer, this.jobModel4, false);
    }

    public shouldWaitForJobsToAppearAndAddSkill(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.guineaPigStylist)
                .goToFirstJobVacancyOnAllJobsList()
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkill(this.sudoku)
                .addSkill(this.cardGames)
                .clickSaveButton()
                .clickBackButton()
                .typeSearchValue(this.passengerStuffer)
                .goToFirstJobVacancyOnAllJobsList()
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkill(this.sudoku)
                .addSkill(this.cardGames)
                .clickSaveButton();
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
