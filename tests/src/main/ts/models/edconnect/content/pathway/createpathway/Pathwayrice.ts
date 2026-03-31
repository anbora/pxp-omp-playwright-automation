// @ts-nocheck
import { Expose } from "common/testing/json";

export class Pathwayrice {

    private amount: number;
    private currency: string;

    public getAmount(): number {

      return amount;
    }

    public setAmount(amount: number): void {

      this.amount = amount;

    }

    public getCurrency(): string {

      return currency;
    }

    public setCurrency(currency: string): void {

      this.currency = currency;

    }

}
