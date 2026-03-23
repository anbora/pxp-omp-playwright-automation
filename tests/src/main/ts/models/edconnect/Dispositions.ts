import { Expose } from "common/testing/json";
import { Disposition } from "models/edconnect/Disposition";

export class Dispositions {

    private dispositions: Array<Disposition>;

    public getDispositions(): Array<Disposition> {

      return dispositions;
    }

    public setDispositions(dispositions: Array<Disposition>): void {

      this.dispositions = dispositions;

    }
}
