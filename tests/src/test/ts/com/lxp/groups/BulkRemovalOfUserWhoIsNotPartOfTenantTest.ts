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

export class BulkRemovalOfUserWhoIsNotPartOfTenantTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + BulkRemovalOfUserWhoIsNotPartOfTenantTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + BulkRemovalOfUserWhoIsNotPartOfTenantTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly NOTIFICATION: string = "Your CSV is being processed";
    private static readonly FILE_NAME: string = "File" + BulkRemovalOfUserWhoIsNotPartOfTenantTest.UNIQUE_SUFFIX + ".csv";
    private static readonly REMOVAL_STATUS: string = "User not part of the group";
    private static readonly USER_OUTSIDE_TENANT_EMAIL: string = "sampleuseremail@csod.com";
    private static readonly BELL_NOTIFICATION_TEXT: string = "CSV file processed successfully with partial failures: 1 users failed, and 0 users were successfully removed from " + BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_NAME;
    private groupId: string;
    private user1: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.groupId = createGroup(BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_NAME, BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user1 = this.createUser(false);
        this.addUserToGroup(this.groupId, this.user1);

    }

    public verifyThatBulkRemovalFileCanBeSuccessfullyUploadedByGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_NAME)
                .changeGroupMemberRole(this.user1.fullName, BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .uploadBulkRemovalCsvFile(generateCsvFileWithContent(BulkRemovalOfUserWhoIsNotPartOfTenantTest.USER_OUTSIDE_TENANT_EMAIL))
                .clickUploadButton()
                .clickRemoveInBulkButton()
                .check(GroupDetailsAssertions)
                    .assertThatFileUploadNotificationTextIs(BulkRemovalOfUserWhoIsNotPartOfTenantTest.NOTIFICATION);
    }

    public verifyBulkRemovalReportStatusWhenTryingToRemoveUserNotBeingPartOfATenant(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, BulkRemovalOfUserWhoIsNotPartOfTenantTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .clickDownloadRemoveReportButton()
                .convertFileToText(BulkRemovalOfUserWhoIsNotPartOfTenantTest.FILE_NAME, this.content)
                .check(BulkRemovalAssertions)
                    .assertDownloadedFileContent(this.content.getValue(), expectedFileContent(BulkRemovalOfUserWhoIsNotPartOfTenantTest.USER_OUTSIDE_TENANT_EMAIL));
    }

    public verifyCorrectBellNotificationForGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(NotificationPage)
                .check(NotificationPageAssertions)
                    .assertThatFirstNotificationContains(BulkRemovalOfUserWhoIsNotPartOfTenantTest.BELL_NOTIFICATION_TEXT);
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

        let filePath: string = System.getProperty("user.dir") + File.separator+"Downloads" + "/" + BulkRemovalOfUserWhoIsNotPartOfTenantTest.FILE_NAME;
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
            FileUtils.cleanDirectory(new File(System.getProperty("user.dir") + File.separator+"Downloads"));
        } catch (e) {
            throw new RuntimeException(e);
        }
    }

    private expectedFileContent(email: string): string {
        return "Email,Removal Status\n" +
                email + "," +
                BulkRemovalOfUserWhoIsNotPartOfTenantTest.REMOVAL_STATUS + "\n";
    }
}
