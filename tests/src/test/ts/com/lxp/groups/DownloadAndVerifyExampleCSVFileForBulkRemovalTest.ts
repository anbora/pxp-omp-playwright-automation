// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { assertEquals } from "common/testing/runtime";

export class DownloadAndVerifyExampleCSVFileForBulkRemovalTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + DownloadAndVerifyExampleCSVFileForBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + DownloadAndVerifyExampleCSVFileForBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly FILE_NAME: string = "bulk_removal_team_members.csv";
    private groupId: string;
    private expectedFileContent: string;
    private user: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.groupId = createGroup(DownloadAndVerifyExampleCSVFileForBulkRemovalTest.GROUP_NAME, DownloadAndVerifyExampleCSVFileForBulkRemovalTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user = this.createUser(true);
      this.expectedFileContent = getFile("fixtures/lxp/groups/bulk_removal_team_members.csv");

    }

    public verifyContentOfTheExampleCSVFile(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(MembersGroupPage, DownloadAndVerifyExampleCSVFileForBulkRemovalTest.GROUP_NAME);
        __page1 = __page1.clickBulkRemovalTab();
        expect(__page1.getDownloadSampleFileButton()).toBeVisible();
        __page1.logger.info("Successfully verified that download sample file button is present");
        __page1 = __page1.clickDownloadSampleFileButton();
        __page1 = __page1.convertFileToText(DownloadAndVerifyExampleCSVFileForBulkRemovalTest.FILE_NAME, this.content);
        assertEquals(this.expectedFileContent, this.content.getValue());
        __page1.logger.info("Successfully verified that downloaded sample file content is the same as expected file content");
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteGroup(this.groupId);
        this.downloadedFileCleanup();

    }

    private downloadedFileCleanup(): void {
        try {
            FileUtils.cleanDirectory(new File(System.getProperty("this.user.dir")+File.separator+"Downloads"));
        } catch (e) {
            throw new RuntimeException(e);
        }
    }
}
