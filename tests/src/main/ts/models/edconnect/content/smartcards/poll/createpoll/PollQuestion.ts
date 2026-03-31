// @ts-nocheck
import { Expose } from "common/testing/json";
import { PollLanguage } from "models/edconnect/content/smartcards/poll/createpoll/PollLanguage";
import { PollQuestionOption } from "models/edconnect/content/smartcards/poll/createpoll/PollQuestionOption";

export class PollQuestion {

    private languages: Array<PollLanguage>;
    private mandatory: boolean;
    private options: Array<PollQuestionOption>;

    public getLanguages(): Array<PollLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<PollLanguage>): void {

      this.languages = languages;

    }

    public getMandatory(): boolean {

      return mandatory;
    }

    public setMandatory(mandatory: boolean): void {

      this.mandatory = mandatory;

    }

    public getOptions(): Array<PollQuestionOption> {

      return options;
    }

    public setOptions(options: Array<PollQuestionOption>): void {

      this.options = options;

    }

}
