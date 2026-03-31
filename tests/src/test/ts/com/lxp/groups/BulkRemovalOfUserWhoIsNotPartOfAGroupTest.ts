// @ts-nocheck

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
import { expect } from "common/testing/playwright";
import { assertEquals } from "common/testing/runtime";

export class BulkRemovalOfUserWhoIsNotPartOfAGroupTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME: string = "group-" + BulkRemovalOfUserWhoIsNotPartOfAGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION: string = "Group description " + BulkRemovalOfUserWhoIsNotPartOfAGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly NOTIFICATION: string = "Your CSV is being processed";
    private static readonly FILE_NAME: string = "File" + BulkRemovalOfUserWhoIsNotPartOfAGroupTest.UNIQUE_SUFFIX + ".csv";
    private static readonly REMOVAL_STATUS: string = "User not part of the group";
    private static readonly BELL_NOTIFICATION_TEXT: string = "CSV file processed successfully with partial failures: 1 users failed, and 0 users were successfully removed from " + BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_NAME;
    private groupId: string;
    private user1: UserModel;
    private readonly groupModel: GroupModel = new GroupModel();
    content: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.groupId = createGroup(BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_NAME, BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_DESCRIPTION, true, this.groupModel);
      this.user1 = this.createUser(false);
        this.addUserToGroup(this.groupId, this.user1);

    }

    public verifyThatBulkRemovalFileCanBeSuccessfullyUploadedByGroupAdmin(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_NAME)
                .changeGroupMemberRole(this.user1.fullName, BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.goDirectlyTo(MembersGroupPage, BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_NAME);
        __page1 = __page1.clickBulkRemovalTab();
        __page1 = __page1.uploadBulkRemovalCsvFile(generateCsvFileWithContent(this.getCypress3User().getEmail()));
        __page1 = __page1.clickUploadButton();
        __page1 = __page1.clickRemoveInBulkButton();
        expect(__page1.getUploadFileNotification()).toContainText(BulkRemovalOfUserWhoIsNotPartOfAGroupTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that upload file BulkRemovalOfUserWhoIsNotPartOfAGroupTest.NOTIFICATION text is as expected");
    }

    public verifyBulkRemovalReportStatusWhenTryingToRemoveUserNotBeingPartOfAGroup(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user1));
        __page2 = __page2.goDirectlyTo(MembersGroupPage, BulkRemovalOfUserWhoIsNotPartOfAGroupTest.GROUP_NAME);
        __page2 = __page2.clickBulkRemovalTab();
        __page2 = __page2.clickDownloadRemoveReportButton();
        __page2 = __page2.convertFileToText(BulkRemovalOfUserWhoIsNotPartOfAGroupTest.FILE_NAME, this.content);
        assertEquals(expectedFileContent(this.getCypress3User().getEmail()), this.content.getValue());
        __page2.logger.info("Successfully verified that downloaded sample file content is the same as expected file content");
    }

    public verifyCorrectBellNotificationForGroupAdmin(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user1));
        __page3 = __page3.goDirectlyTo(NotificationPage);
        expect(__page3.notificationMessage.first()).toContainText(BulkRemovalOfUserWhoIsNotPartOfAGroupTest.BELL_NOTIFICATION_TEXT, { timeout: 30000 });
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

        let filePath: string = System.getProperty("user.dir") + File.separator + "Downloads" + "/" + BulkRemovalOfUserWhoIsNotPartOfAGroupTest.FILE_NAME;
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
                BulkRemovalOfUserWhoIsNotPartOfAGroupTest.REMOVAL_STATUS + "\n";
    }
}
