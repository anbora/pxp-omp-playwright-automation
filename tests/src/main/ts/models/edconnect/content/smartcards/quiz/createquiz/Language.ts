import { Expose, JsonProperty, SerializedName } from "common/testing/json";

export class Language {
    private title: string;
    private languageCode: string;

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }
}
