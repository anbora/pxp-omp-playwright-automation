import { BulkRemovalAssertions } from "assertions/groups/BulkRemovalAssertions";
import { MembersGroupAssertions } from "assertions/groups/MembersGroupAssertions";
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(MembersGroupPage, DownloadAndVerifyExampleCSVFileForBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .check(BulkRemovalAssertions)
                    .assertThatDownloadSampleFileButtonIsVisible()
                .endAssertion()
                .clickDownloadSampleFileButton()
                .convertFileToText(DownloadAndVerifyExampleCSVFileForBulkRemovalTest.FILE_NAME, this.content)
                .check(BulkRemovalAssertions)
                    .assertDownloadedFileContent(this.content.getValue(), this.expectedFileContent);
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
