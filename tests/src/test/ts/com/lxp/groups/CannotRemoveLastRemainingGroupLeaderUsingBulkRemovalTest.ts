import { BulkRemovalAssertions } from "assertions/groups/BulkRemovalAssertions";
import { GroupDetailsAssertions } from "assertions/groups/GroupDetailsAssertions";
import { MembersGroupAssertions } from "assertions/groups/MembersGroupAssertions";
import { NotificationPageAssertions } from "assertions/other/NotificationPageAssertions";
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { NotificationPage } from "pages/other/NotificationPage";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly NOTIFICATION: string = "Your CSV is being processed";
    private static readonly FILE_NAME: string = "File" + CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.UNIQUE_SUFFIX + ".csv";
    private static readonly REMOVAL_STATUS: string = "Couldn’t remove the user since there must be at least one group leader";
    private static readonly BELL_NOTIFICATION_TEXT: string = "CSV file processed successfully with partial failures: 1 users failed, and 0 users were successfully removed from " + CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_NAME;
    private groupId: string;
    private user1: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.groupId = createGroup(CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_NAME, CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user1 = this.createUser(false);
        this.addUserToGroup(this.groupId,this.user1);

    }

    public verifyThatBulkRemovalFileCanBeSuccessfullyUploadedByGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_NAME)
                .changeGroupMemberRole(this.user1.fullName, CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .uploadBulkRemovalCsvFile(generateCsvFileWithContent(this.getCypressUser().getEmail()))
                .clickUploadButton()
                .clickRemoveInBulkButton()
                .check(GroupDetailsAssertions)
                    .assertThatFileUploadNotificationTextIs(CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.NOTIFICATION);
    }

    public verifyBulkRemovalReportStatusWhenTryingToRemoveLastRemainingGroupLeaderFromGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .clickDownloadRemoveReportButton()
                .convertFileToText(CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.FILE_NAME, this.content)
                .check(BulkRemovalAssertions)
                    .assertDownloadedFileContent(this.content.getValue(), expectedFileContent(this.getCypressUser().getEmail()));
    }

    public verifyCorrectBellNotificationForGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(NotificationPage)
                .check(NotificationPageAssertions)
                    .assertThatFirstNotificationContains(CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.BELL_NOTIFICATION_TEXT);
    }

    public afterTests(): void {
        this.deleteUser(this.user1);
        this.deleteGroup(this.groupId);
        this.fileCleanup();

    }

    private generateCsvFileWithContent(email: string): string {
        let lines: Array<string> = List.of(
                "email",
                email
        );

        let filePath: string = System.getProperty("user.dir") + File.separator + "Downloads" + "/" + CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.FILE_NAME;
        try {
            let file: Path = Paths.get(filePath);
            Files.write(file, lines);
            return filePath;
        } catch (e) {
            e.printStackTrace();
            return null;
        }
    }

    private fileCleanup(): void {
        try {
            FileUtils.cleanDirectory(new File(System.getProperty("user.dir") + File.separator + "Downloads"));
        } catch (e) {
            throw new RuntimeException(e);
        }
    }

    private expectedFileContent(email: string): string {
        return "Email,Removal Status\n" +
                email + "," +
                CannotRemoveLastRemainingGroupLeaderUsingBulkRemovalTest.REMOVAL_STATUS + "\n";
    }
}
