// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { ResultContainer } from "models/ResultContainer";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { NotificationPage } from "pages/other/NotificationPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";
import { assertEquals } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getCypressUser()));
        __page1 = __page1.goDirectlyTo(MembersGroupPage, InvalidEmailInBulkRemovalUploadFileTest.GROUP_NAME);
        __page1 = __page1.clickBulkRemovalTab();
        __page1 = __page1.uploadBulkRemovalCsvFile(generateCsvFileWithContent(InvalidEmailInBulkRemovalUploadFileTest.INVALID_EMAIL));
        __page1 = __page1.clickUploadButton();
        __page1 = __page1.clickRemoveInBulkButton();
        expect(__page1.getUploadFileNotification()).toContainText(InvalidEmailInBulkRemovalUploadFileTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that upload file InvalidEmailInBulkRemovalUploadFileTest.NOTIFICATION text is as expected");
    }

    public verifyBulkRemovalReportStatusWhenUsingInvalidEmail(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getCypressUser()));
        __page2 = __page2.goDirectlyTo(MembersGroupPage, InvalidEmailInBulkRemovalUploadFileTest.GROUP_NAME);
        __page2 = __page2.clickBulkRemovalTab();
        __page2 = __page2.clickDownloadRemoveReportButton();
        __page2 = __page2.convertFileToText(InvalidEmailInBulkRemovalUploadFileTest.FILE_NAME, this.content);
        assertEquals(expectedFileContent(InvalidEmailInBulkRemovalUploadFileTest.INVALID_EMAIL), this.content.getValue());
        __page2.logger.info("Successfully verified that downloaded sample file content is the same as expected file content");
    }

    public verifyCorrectBellNotificationForGroupLeader(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getCypressUser()));
        __page3 = __page3.goDirectlyTo(NotificationPage);
        expect(__page3.notificationMessage.first()).toContainText(InvalidEmailInBulkRemovalUploadFileTest.BELL_NOTIFICATION_TEXT, { timeout: 30000 });
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
