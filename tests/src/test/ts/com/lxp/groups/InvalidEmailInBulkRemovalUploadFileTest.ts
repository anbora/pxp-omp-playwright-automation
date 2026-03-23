import { BulkRemovalAssertions } from "assertions/groups/BulkRemovalAssertions";
import { GroupDetailsAssertions } from "assertions/groups/GroupDetailsAssertions";
import { MembersGroupAssertions } from "assertions/groups/MembersGroupAssertions";
import { NotificationPageAssertions } from "assertions/other/NotificationPageAssertions";
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { ResultContainer } from "models/ResultContainer";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { NotificationPage } from "pages/other/NotificationPage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class InvalidEmailInBulkRemovalUploadFileTest extends GroupsRestService{
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + InvalidEmailInBulkRemovalUploadFileTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + InvalidEmailInBulkRemovalUploadFileTest.UNIQUE_SUFFIX;
    private static readonly INVALID_EMAIL: string = "aaaa";
    private static readonly NOTIFICATION: string = "Your CSV is being processed";
    private static readonly FILE_NAME: string = "File" + InvalidEmailInBulkRemovalUploadFileTest.UNIQUE_SUFFIX + ".csv";
    private static readonly REMOVAL_STATUS: string = "Invalid Email";
    private static readonly BELL_NOTIFICATION_TEXT: string = "CSV file processed successfully with partial failures: 1 users failed, and 0 users were successfully removed from " + InvalidEmailInBulkRemovalUploadFileTest.GROUP_NAME;
    private groupId: string;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

    this.groupId = createGroup(InvalidEmailInBulkRemovalUploadFileTest.GROUP_NAME, InvalidEmailInBulkRemovalUploadFileTest.GROUP_DESCRIPTION, true, this.groupModel);

    }

    public verifyThatBulkRemovalFileCanBeSuccessfullyUploadedByGroupLeader(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, InvalidEmailInBulkRemovalUploadFileTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .uploadBulkRemovalCsvFile(generateCsvFileWithContent(InvalidEmailInBulkRemovalUploadFileTest.INVALID_EMAIL))
                .clickUploadButton()
                .clickRemoveInBulkButton()
                .check(GroupDetailsAssertions)
                    .assertThatFileUploadNotificationTextIs(InvalidEmailInBulkRemovalUploadFileTest.NOTIFICATION);
    }

    public verifyBulkRemovalReportStatusWhenUsingInvalidEmail(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, InvalidEmailInBulkRemovalUploadFileTest.GROUP_NAME)
                .clickBulkRemovalTab()
                .clickDownloadRemoveReportButton()
                .convertFileToText(InvalidEmailInBulkRemovalUploadFileTest.FILE_NAME, this.content)
                .check(BulkRemovalAssertions)
                    .assertDownloadedFileContent(this.content.getValue(), expectedFileContent(InvalidEmailInBulkRemovalUploadFileTest.INVALID_EMAIL));
    }

    public verifyCorrectBellNotificationForGroupLeader(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(NotificationPage)
                .check(NotificationPageAssertions)
                    .assertThatFirstNotificationContains(InvalidEmailInBulkRemovalUploadFileTest.BELL_NOTIFICATION_TEXT);
    }

    public afterTests(): void {
        this.deleteGroup(this.groupId);
        this.fileCleanup();

    }

    private generateCsvFileWithContent(email: string): string {
        let lines: Array<string> = List.of(
                "email",
                email
        );

        let filePath: string = System.getProperty("user.dir") + File.separator + "Downloads" + "/" + InvalidEmailInBulkRemovalUploadFileTest.FILE_NAME;
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
                InvalidEmailInBulkRemovalUploadFileTest.REMOVAL_STATUS + "\n";
    }
}
