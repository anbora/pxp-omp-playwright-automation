import { Expose, JsonProperty, SerializedName } from "common/testing/json";

export class UpdateQuizMetadata {

    private allowEnrollment: boolean;
    private discount: boolean;
    private promotion: boolean;

    public getAllowEnrollment(): boolean {

      return allowEnrollment;
    }

    public setAllowEnrollment(allowEnrollment: boolean): void {

      this.allowEnrollment = allowEnrollment;

    }

    public getDiscount(): boolean {

      return discount;
    }

    public setDiscount(discount: boolean): void {

      this.discount = discount;

    }

    public getPromotion(): boolean {

      return promotion;
    }

    public setPromotion(promotion: boolean): void {

      this.promotion = promotion;

    }

}
