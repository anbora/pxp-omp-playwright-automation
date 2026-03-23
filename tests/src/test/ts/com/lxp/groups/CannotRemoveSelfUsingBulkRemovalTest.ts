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

export class CannotRemoveSelfUsingBulkRemovalTest extends GroupsRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + CannotRemoveSelfUsingBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + CannotRemoveSelfUsingBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly NOTIFICATION: string = "Your CSV is being processed";
    private static readonly FILE_NAME: string = "File" + CannotRemoveSelfUsingBulkRemovalTest.UNIQUE_SUFFIX + ".csv";
    private static readonly REMOVAL_STATUS: string = "Cannot remove self from group";
    private static readonly BELL_NOTIFICATION_TEXT: string = "CSV file processed successfully with partial failures: 1 users failed, and 0 users were successfully removed from " + CannotRemoveSelfUsingBulkRemovalTest.GROUP_NAME;
    private groupId: string;
    private user: UserModel;
    private user2: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.groupId = createGroup(CannotRemoveSelfUsingBulkRemovalTest.GROUP_NAME, CannotRemoveSelfUsingBulkRemovalTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user = this.createUser(true);
      this.user2 = this.createUser(false);
        this.addUserToGroup(this.groupId, this.user2);

    }

    public verifyThatBulkRemovalFileCanBeSuccessfullyUploadedByGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(MembersGroupPage, CannotRemoveSelfUsingBulkRemovalTest.GROUP_NAME)
                .changeGroupMemberRole(this.user2.fullName, CannotRemoveSelfUsingBulkRemovalTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goDirectlyTo(MembersGroupPage, CannotRemoveSelfUsingBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .uploadBulkRemovalCsvFile(generateCsvFileWithContent(this.user2.getEmail()))
                .clickUploadButton()
                .clickRemoveInBulkButton()
                .check(GroupDetailsAssertions)
                    .assertThatFileUploadNotificationTextIs(CannotRemoveSelfUsingBulkRemovalTest.NOTIFICATION);
    }

    public verifyBulkRemovalReportStatusWhenTryingToRemoveSelfFromGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goDirectlyTo(MembersGroupPage, CannotRemoveSelfUsingBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .clickDownloadRemoveReportButton()
                .convertFileToText(CannotRemoveSelfUsingBulkRemovalTest.FILE_NAME, this.content)
                .check(BulkRemovalAssertions)
                    .assertDownloadedFileContent(this.content.getValue(), expectedFileContent(this.user2.getEmail()));
    }

    public verifyCorrectBellNotificationForGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user2))
                .goDirectlyTo(NotificationPage)
                .check(NotificationPageAssertions)
                    .assertThatFirstNotificationContains(CannotRemoveSelfUsingBulkRemovalTest.BELL_NOTIFICATION_TEXT);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
        this.deleteGroup(this.groupId);
        this.fileCleanup();

    }

    private generateCsvFileWithContent(email: string): string {
        let lines: Array<string> = List.of(
                "email",
                email
        );

        let filePath: string = System.getProperty("this.user.dir") + File.separator + "Downloads" + "/" + CannotRemoveSelfUsingBulkRemovalTest.FILE_NAME;
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
            FileUtils.cleanDirectory(new File(System.getProperty("this.user.dir") + File.separator + "Downloads"));
        } catch (e) {
            throw new RuntimeException(e);
        }
    }

    private expectedFileContent(email: string): string {
        return "Email,Removal Status\n" +
                email + "," +
                CannotRemoveSelfUsingBulkRemovalTest.REMOVAL_STATUS + "\n";
    }
}
