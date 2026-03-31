// @ts-nocheck
import fs from "node:fs";
import path from "node:path";

export class ResultDashboardApi {
  private static readonly PATH_TO_REPORT_DIR = path.join(process.cwd(), "xmlsuites");
  private static readonly RESULT_DASHBOARD_RUN_NAME_FILE = "resultDashboardRunName.txt";

  public isResultDashboardEnabled(): boolean {
    return System.getProperty("resultDashboard", "false") === "true";
  }

  public getRunName(): string {
    return System.getProperty("runName", "emptyRunName");
  }

  public sendRequest(endpoint: string, body: string): void {
    void this.send("POST", endpoint, body);
  }

  public sendPutRequest(endpoint: string, body: string): void {
    void this.send("PUT", endpoint, body);
  }

  public updateRunNumber(endpoint: string, body: string): string {
    void this.send("POST", endpoint, body);
    return "";
  }

  public getFailedTestsListRequest(_endpoint: string): string[] {
    return [];
  }

  public writeRunNameToFile(): void {
    try {
      fs.mkdirSync(ResultDashboardApi.PATH_TO_REPORT_DIR, { recursive: true });
      fs.writeFileSync(
        path.join(ResultDashboardApi.PATH_TO_REPORT_DIR, ResultDashboardApi.RESULT_DASHBOARD_RUN_NAME_FILE),
        this.getRunName(),
        "utf8"
      );
    } catch (error) {
      console.error(error);
    }
  }

  private async send(method: "POST" | "PUT", endpoint: string, body: string) {
    try {
      await fetch("http://result-dashboard.devops.lumesse.top/api/" + endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body
      });
    } catch (error) {
      console.error(error);
    }
  }
}
