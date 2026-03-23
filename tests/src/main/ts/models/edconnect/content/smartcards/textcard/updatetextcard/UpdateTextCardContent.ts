import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateTextCardLanguage } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardLanguage";
import { UpdateTextCardPrice } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardPrice";
import { UpdateTextCardTag } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardTag";

export class UpdateTextCardContent {

    private contributorIds: Array<any>;
    private duration: number;
    private expirationDate: string;
    private isPrivate: boolean;
    private languages: Array<UpdateTextCardLanguage>;
    private level: string;
    private lmsCreatedAt: string;
    private plan: string;
    private prices: Array<UpdateTextCardPrice>;
    private publishedAt: string;
    private readableContentType: string;
    private rootId: string;
    private tags: Array<UpdateTextCardTag>;
    private userIdentifierType: string;
    private userTaxonomyTopics: Array<string>;

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

    public getIsPrivate(): boolean {

      return isPrivate;
    }

    public setIsPrivate(isPrivate: boolean): void {

      this.isPrivate = isPrivate;

    }

    public getLanguages(): Array<UpdateTextCardLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdateTextCardLanguage>): void {

      this.languages = languages;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getLmsCreatedAt(): string {

      return lmsCreatedAt;
    }

    public setLmsCreatedAt(lmsCreatedAt: string): void {

      this.lmsCreatedAt = lmsCreatedAt;

    }

    public getPlan(): string {

      return plan;
    }

    public setPlan(plan: string): void {

      this.plan = plan;

    }

    public getPrices(): Array<UpdateTextCardPrice> {

      return prices;
    }

    public setPrices(prices: Array<UpdateTextCardPrice>): void {

      this.prices = prices;

    }

    public getPublishedAt(): string {

      return publishedAt;
    }

    public setPublishedAt(publishedAt: string): void {

      this.publishedAt = publishedAt;

    }

    public getReadableContentType(): string {

      return readableContentType;
    }

    public setReadableContentType(readableContentType: string): void {

      this.readableContentType = readableContentType;

    }

    public getRootId(): string {

      return rootId;
    }

    public setRootId(rootId: string): void {

      this.rootId = rootId;

    }

    public getTags(): Array<UpdateTextCardTag> {

      return tags;
    }

    public setTags(tags: Array<UpdateTextCardTag>): void {

      this.tags = tags;

    }

    public getUserIdentifierType(): string {

      return userIdentifierType;
    }

    public setUserIdentifierType(userIdentifierType: string): void {

      this.userIdentifierType = userIdentifierType;

    }

    public getUserTaxonomyTopics(): Array<string> {

      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }

}
