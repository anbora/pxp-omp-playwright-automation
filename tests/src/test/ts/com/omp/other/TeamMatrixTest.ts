import { ManagerDashboardPageAssertions } from "assertions/other/ManagerDashboardPageAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class TeamMatrixTest extends BaseTest {

    public TeamMatrixLoadsForManager(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToHomePage()
                .goToManagerDashboardPage()
                .check(ManagerDashboardPageAssertions)
                    .assertSkillsMatrixLoads()
                .endAssertion()
                .clickRateSkills()
                .check(ManagerDashboardPageAssertions)
                    .assertRateSkillsModalLoads()
                .endAssertion();
    }
}
