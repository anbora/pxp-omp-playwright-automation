// @ts-nocheck
import { Config } from "common/config/Config";

export class ZapReportSaver {
  constructor(private readonly _config: Config) {}

  public save(): void {
    // ZAP report persistence is intentionally a no-op while the TypeScript port is stabilized.
  }

  public getRecordsToScan(): number {
    return 0;
  }
}
