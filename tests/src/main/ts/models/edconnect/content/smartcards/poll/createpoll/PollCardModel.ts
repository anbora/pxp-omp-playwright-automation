import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { Poll } from "models/edconnect/content/smartcards/poll/createpoll/Poll";
import { PollLanguage } from "models/edconnect/content/smartcards/poll/createpoll/PollLanguage";

export class PollCardModel {

    private contentType: string;
    private isPublic: boolean;
    private languages: Array<PollLanguage>;
    private poll: Poll;

    public getContentType(): string {

      return contentType;
    }

    public setContentType(contentType: string): void {

      this.contentType = contentType;

    }

    public getIsPublic(): boolean {

      return isPublic;
    }

    public setIsPublic(isPublic: boolean): void {

      this.isPublic = isPublic;

    }

    public getLanguages(): Array<PollLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<PollLanguage>): void {

      this.languages = languages;

    }

    public getPoll(): Poll {

      return poll;
    }

    public setPoll(poll: Poll): void {

      this.poll = poll;

    }

}
