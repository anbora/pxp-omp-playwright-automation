import { Expose } from "common/testing/json";
import { UpdatePollLanguage } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollLanguage";

export class UpdatePollOption {

    private languages: Array<UpdatePollLanguage>;

    public getLanguages(): Array<UpdatePollLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdatePollLanguage>): void {

      this.languages = languages;

    }

}
