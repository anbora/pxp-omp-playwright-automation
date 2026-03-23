import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { JourneyLanguage } from "models/edconnect/content/journey/createjourney/JourneyLanguage";
import { JourneyMetadata } from "models/edconnect/content/journey/createjourney/JourneyMetadata";
import { JourneyPrice } from "models/edconnect/content/journey/createjourney/JourneyPrice";
import { JourneyTag } from "models/edconnect/content/journey/createjourney/JourneyTag";

export class JourneyContent {
    private autoComplete: boolean;
    private contentType: string;
    private duration: number;
    private isPrivate: boolean;
    private languages: Array<JourneyLanguage>;
    private level: string;
    private metadata: JourneyMetadata;
    private plan: string;
    private prices: Array<JourneyPrice>;
    private tags: Array<JourneyTag>;
    private userTaxonomyTopics: Array<string>;

    public getAutoComplete(): boolean {

      return autoComplete;
    }

    public setAutoComplete(autoComplete: boolean): void {

      this.autoComplete = autoComplete;

    }

    public getContentType(): string {

      return contentType;
    }

    public setContentType(contentType: string): void {

      this.contentType = contentType;

    }

    public getDuration(): number {

      return duration;
    }

    public setDuration(duration: number): void {

      this.duration = duration;

    }

    public getIsPrivate(): boolean {

      return isPrivate;
    }

    public setIsPrivate(isPrivate: boolean): void {

      this.isPrivate = isPrivate;

    }

    public getLanguages(): Array<JourneyLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<JourneyLanguage>): void {

      this.languages = languages;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getMetadata(): JourneyMetadata {

      return metadata;
    }

    public setMetadata(metadata: JourneyMetadata): void {

      this.metadata = metadata;

    }

    public getPlan(): string {

      return plan;
    }

    public setPlan(plan: string): void {

      this.plan = plan;

    }

    public getPrices(): Array<JourneyPrice> {

      return prices;
    }

    public setPrices(prices: Array<JourneyPrice>): void {

      this.prices = prices;

    }

    public getTags(): Array<JourneyTag> {

      return tags;
    }

    public setTags(tags: Array<JourneyTag>): void {

      this.tags = tags;

    }

    public getUserTaxonomyTopics(): Array<string> {

      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }
}
