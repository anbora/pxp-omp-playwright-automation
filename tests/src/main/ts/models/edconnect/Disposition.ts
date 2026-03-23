import { Expose, SerializedName } from "common/testing/json";

export class Disposition {

    private application_status: string;
    private opportunity_id: string;
    private source: string;
    private status_update_date_time: string;
    private user_id: string;

    public getApplication_status(): string {

      return application_status;
    }

    public setApplication_status(application_status: string): void {

      this.application_status = application_status;

    }

    public getOpportunity_id(): string {

      return opportunity_id;
    }

    public setOpportunity_id(opportunity_id: string): void {

      this.opportunity_id = opportunity_id;

    }

    public getSource(): string {

      return source;
    }

    public setSource(source: string): void {

      this.source = source;

    }

    public getStatus_update_date_time(): string {

      return status_update_date_time;
    }

    public setStatus_update_date_time(status_update_date_time: string): void {

      this.status_update_date_time = status_update_date_time;

    }

    public getUser_id(): string {

      return user_id;
    }

    public setUser_id(user_id: string): void {

      this.user_id = user_id;

    }
}
