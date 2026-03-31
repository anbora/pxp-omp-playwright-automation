// @ts-nocheck
import { Expose } from "common/testing/json";
import { UpdatePollLanguage } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollLanguage";
import { UpdatePollOption } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollOption";

export class UpdatePollQuestion {

    private languages: Array<UpdatePollLanguage>;
    private mandatory: boolean;
    private options: Array<UpdatePollOption>;

    public getLanguages(): Array<UpdatePollLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdatePollLanguage>): void {

      this.languages = languages;

    }

    public getMandatory(): boolean {

      return mandatory;
    }

    public setMandatory(mandatory: boolean): void {

      this.mandatory = mandatory;

    }

    public getOptions(): Array<UpdatePollOption> {

      return options;
    }

    public setOptions(options: Array<UpdatePollOption>): void {

      this.options = options;

    }

}
