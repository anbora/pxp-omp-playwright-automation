// @ts-nocheck
import { Expose } from "common/testing/json";

export class Recruiters {

    private external_id: string;
    private visible: boolean;

    public getExternal_id(): string {

      return external_id;
    }

    public setExternal_id(external_id: string): void {

      this.external_id = external_id;

    }

    public getVisible(): boolean {

      return visible;
    }

    public setVisible(visible: boolean): void {

      this.visible = visible;

    }
}
