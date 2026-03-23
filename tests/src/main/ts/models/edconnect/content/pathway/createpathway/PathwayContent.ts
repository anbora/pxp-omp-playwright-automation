import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { PathwayLanguage } from "models/edconnect/content/pathway/createpathway/PathwayLanguage";
import { PathwayMetadata } from "models/edconnect/content/pathway/createpathway/PathwayMetadata";
import { Pathwayrice } from "models/edconnect/content/pathway/createpathway/Pathwayrice";
import { PathwayTag } from "models/edconnect/content/pathway/createpathway/PathwayTag";

export class PathwayContent {

    private autoComplete: boolean;
    private contentType: string;
    private duration: number;
    private isPrivate: boolean;
    private languages: Array<PathwayLanguage>;
    private level: string;
    private metadata: PathwayMetadata;
    private plan: string;
    private prices: Array<Pathwayrice>;
    private tags: Array<PathwayTag>;
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

    public getLanguages(): Array<PathwayLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<PathwayLanguage>): void {

      this.languages = languages;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getMetadata(): PathwayMetadata {

      return metadata;
    }

    public setMetadata(metadata: PathwayMetadata): void {

      this.metadata = metadata;

    }

    public getPlan(): string {

      return plan;
    }

    public setPlan(plan: string): void {

      this.plan = plan;

    }

    public getPrices(): Array<Pathwayrice> {

      return prices;
    }

    public setPrices(prices: Array<Pathwayrice>): void {

      this.prices = prices;

    }

    public getTags(): Array<PathwayTag> {

      return tags;
    }

    public setTags(tags: Array<PathwayTag>): void {

      this.tags = tags;

    }

    public getUserTaxonomyTopics(): Array<string> {

      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }

}
