import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdatePoll } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePoll";
import { UpdatePollLanguage } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollLanguage";

export class UpdatePollModel {

    private isPublic: boolean;
    private languages: Array<UpdatePollLanguage>;
    private poll: UpdatePoll;
    private readableContentType: string;

    public getIsPublic(): boolean {

      return isPublic;
    }

    public setIsPublic(isPublic: boolean): void {

      this.isPublic = isPublic;

    }

    public getLanguages(): Array<UpdatePollLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdatePollLanguage>): void {

      this.languages = languages;

    }

    public getPoll(): UpdatePoll {

      return poll;
    }

    public setPoll(poll: UpdatePoll): void {

      this.poll = poll;

    }

    public getReadableContentType(): string {

      return readableContentType;
    }

    public setReadableContentType(readableContentType: string): void {

      this.readableContentType = readableContentType;

    }

}
