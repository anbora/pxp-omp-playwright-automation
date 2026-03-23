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

export class SuccessfulRemovalOfGroupMemberViaBulkRemovalTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly NOTIFICATION: string = "Your CSV is being processed";
    private static readonly FILE_NAME: string = "File" + SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.UNIQUE_SUFFIX + ".csv";
    private static readonly REMOVAL_STATUS: string = "Successfully Removed";
    private static readonly BELL_NOTIFICATION_TEXT: string = "CSV file processed successfully with all records: 1 users removed successfully from " +  SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_NAME + " via CSV.";
    private static readonly TOTAL_NUMBER_OF_GROUP_MEMBERS: string = "2";
    private groupId: string;
    private user1: UserModel;
    private user2: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.groupId = createGroup(SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_NAME, SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user1 = this.createUser(false);
      this.user2 = this.createUser(false);
        this.addUserToGroup(this.groupId, this.user1);
        this.addUserToGroup(this.groupId, this.user2);

    }

    public verifyThatBulkRemovalFileCanBeSuccessfullyUploadedByGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_NAME)
                .changeGroupMemberRole(this.user1.fullName, SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .uploadBulkRemovalCsvFile(generateCsvFileWithContent(this.user2.getEmail()))
                .clickUploadButton()
                .clickRemoveInBulkButton()
                .check(GroupDetailsAssertions)
                    .assertThatFileUploadNotificationTextIs(SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.NOTIFICATION);
    }

    public verifyBulkRemovalReportStatusWhenRemovingMemberBeingPartOfAGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .clickDownloadRemoveReportButton()
                .convertFileToText(SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.FILE_NAME, this.content)
                .check(BulkRemovalAssertions)
                    .assertDownloadedFileContent(this.content.getValue(), expectedFileContent(this.user2.getEmail()));
    }

    public verifyNumberOfGroupMembersHasBeenUpdatedAfterBulkRemoval(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(MembersGroupPage, SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.GROUP_NAME)
                .check(MembersGroupAssertions)
                    .assertThatTotalNumberOfGroupMembersIs(SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.TOTAL_NUMBER_OF_GROUP_MEMBERS);

    }

    public verifyCorrectBellNotificationForGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(NotificationPage)
                .check(NotificationPageAssertions)
                    .assertThatFirstNotificationContains(SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.BELL_NOTIFICATION_TEXT);
    }

    public afterTests(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteGroup(this.groupId);
        this.fileCleanup();

    }

    private generateCsvFileWithContent(email: string): string {
        let lines: Array<string> = List.of(
                "email",
                email
        );

        let filePath: string = System.getProperty("user.dir") + File.separator+"Downloads" + "/" + SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.FILE_NAME;
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
                SuccessfulRemovalOfGroupMemberViaBulkRemovalTest.REMOVAL_STATUS + "\n";
    }
}
