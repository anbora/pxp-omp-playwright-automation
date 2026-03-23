import { Expose } from "common/testing/json";

export class Salary {

    private currency: string;
    private from: number;
    private period: string;
    private to: number;

    public getCurrency(): string {

      return currency;
    }

    public setCurrency(currency: string): void {

      this.currency = currency;

    }

    public getFrom(): number {

      return from;
    }

    public setFrom(from: number): void {

      this.from = from;

    }

    public getPeriod(): string {

      return period;
    }

    public setPeriod(period: string): void {

      this.period = period;

    }

    public getTo(): number {

      return to;
    }

    public setTo(to: number): void {

      this.to = to;

    }

}
