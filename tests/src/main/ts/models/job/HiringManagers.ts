import { Expose } from "common/testing/json";

export class HiringManagers {
    private externalId: string;
    private visible: boolean;

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getVisible(): boolean {

      return visible;
    }

    public setVisible(visible: boolean): void {

      this.visible = visible;

    }
}
