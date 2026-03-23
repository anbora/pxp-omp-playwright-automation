import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { TextCardLanguage } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardLanguage";
import { TextCardMetadata } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardMetadata";
import { TextCardPrice } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardPrice";
import { TextCardTag } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardTag";

export class TextCardContent {

    private contentType: string;
    private contributorIds: Array<any>;
    private duration: number;
    private expirationDate: string;
    private externalId: string;
    private isPrivate: boolean;
    private languages: Array<TextCardLanguage>;
    private level: string;
    private metadata: TextCardMetadata;
    private plan: string;
    private prices: Array<TextCardPrice>;
    private readableContentType: string;
    private tags: Array<TextCardTag>;
    private userTaxonomyTopics: Array<string>;

    public getContentType(): string {

      return contentType;
    }

    public setContentType(contentType: string): void {

      this.contentType = contentType;

    }

    public getContributorIds(): Array<any> {

      return contributorIds;
    }

    public setContributorIds(contributorIds: Array<any>): void {

      this.contributorIds = contributorIds;

    }

    public getDuration(): number {

      return duration;
    }

    public setDuration(duration: number): void {

      this.duration = duration;

    }

    public getExpirationDate(): string {

      return expirationDate;
    }

    public setExpirationDate(expirationDate: string): void {

      this.expirationDate = expirationDate;

    }

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getIsPrivate(): boolean {

      return isPrivate;
    }

    public setIsPrivate(isPrivate: boolean): void {

      this.isPrivate = isPrivate;

    }

    public getLanguages(): Array<TextCardLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<TextCardLanguage>): void {

      this.languages = languages;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getMetadata(): TextCardMetadata {

      return metadata;
    }

    public setMetadata(metadata: TextCardMetadata): void {

      this.metadata = metadata;

    }

    public getPlan(): string {

      return plan;
    }

    public setPlan(plan: string): void {

      this.plan = plan;

    }

    public getPrices(): Array<TextCardPrice> {

      return prices;
    }

    public setPrices(prices: Array<TextCardPrice>): void {

      this.prices = prices;

    }

    public getReadableContentType(): string {

      return readableContentType;
    }

    public setReadableContentType(readableContentType: string): void {

      this.readableContentType = readableContentType;

    }

    public getTags(): Array<TextCardTag> {

      return tags;
    }

    public setTags(tags: Array<TextCardTag>): void {

      this.tags = tags;

    }

    public getUserTaxonomyTopics(): Array<string> {

      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }

}
