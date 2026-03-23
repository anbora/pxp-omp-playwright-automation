import { Expose } from "common/testing/json";

export class JobDescription {

    private applyURL: string;
    private _default: boolean;
    private description: string;
    private jobDetailsURL: string;
    private languageCode: string;
    private referralURL: string;
    private title: string;

    public getApplyURL(): string {

      return applyURL;
    }

    public setApplyURL(applyURL: string): void {

      this.applyURL = applyURL;

    }

    public getDefault(): boolean {

      return _default;
    }

    public setDefault(_default: boolean): void {

      this._default = _default;

    }

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

    }

    public getJobDetailsURL(): string {

      return jobDetailsURL;
    }

    public setJobDetailsURL(jobDetailsURL: string): void {

      this.jobDetailsURL = jobDetailsURL;

    }

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getReferralURL(): string {

      return referralURL;
    }

    public setReferralURL(referralURL: string): void {

      this.referralURL = referralURL;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
