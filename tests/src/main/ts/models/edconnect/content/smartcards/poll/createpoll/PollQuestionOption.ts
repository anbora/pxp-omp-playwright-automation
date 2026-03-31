// @ts-nocheck
import { Expose } from "common/testing/json";
import { PollLanguage } from "models/edconnect/content/smartcards/poll/createpoll/PollLanguage";

export class PollQuestionOption {

    private languages: Array<PollLanguage>;

    public getLanguages(): Array<PollLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<PollLanguage>): void {

      this.languages = languages;

    }

}
