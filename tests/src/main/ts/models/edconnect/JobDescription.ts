import { Expose } from "common/testing/json";

export class JobDescription {

    private apply_url: string;
    private _default: boolean;
    private description: string;
    private job_details_url: string;
    private language_code: string;
    private referral_url: string;
    private title: string;

    public getApply_url(): string {

      return apply_url;
    }

    public setApply_url(apply_url: string): void {

      this.apply_url = apply_url;

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

    public getJob_details_url(): string {

      return job_details_url;
    }

    public setJob_details_url(job_details_url: string): void {

      this.job_details_url = job_details_url;

    }

    public getLanguage_code(): string {

      return language_code;
    }

    public setLanguage_code(language_code: string): void {

      this.language_code = language_code;

    }

    public getReferral_url(): string {

      return referral_url;
    }

    public setReferral_url(referral_url: string): void {

      this.referral_url = referral_url;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }
}
