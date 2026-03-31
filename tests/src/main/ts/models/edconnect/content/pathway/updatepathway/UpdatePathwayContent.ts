// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdatePathwayLanguage } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayLanguage";
import { UpdatePathwayMetadata } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayMetadata";
import { UpdatePathwayPrice } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayPrice";
import { UpdatePathwayTag } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayTag";

export class UpdatePathwayContent {

    private autoComplete: boolean;
    private duration: number;
    private isPrivate: boolean;
    private languages: Array<UpdatePathwayLanguage>;
    private level: string;
    private metadata: UpdatePathwayMetadata;
    private plan: string;
    private prices: Array<UpdatePathwayPrice>;
    private tags: Array<UpdatePathwayTag>;
    private shareUrl: string;
    private slug: string;
    private sourceId: string;
    private externalId: string;
    private id: string;
    private createdAt: string;
    private userTaxonomyTopics: Array<string>;

    public getAutoComplete(): boolean {

      return autoComplete;
    }

    public setAutoComplete(autoComplete: boolean): void {

      this.autoComplete = autoComplete;

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

    public getLanguages(): Array<UpdatePathwayLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdatePathwayLanguage>): void {

      this.languages = languages;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getMetadata(): UpdatePathwayMetadata {

      return metadata;
    }

    public setMetadata(metadata: UpdatePathwayMetadata): void {

      this.metadata = metadata;

    }

    public getPlan(): string {

      return plan;
    }

    public setPlan(plan: string): void {

      this.plan = plan;

    }

    public getPrices(): Array<UpdatePathwayPrice> {

      return prices;
    }

    public setPrices(prices: Array<UpdatePathwayPrice>): void {

      this.prices = prices;

    }

    public getTags(): Array<UpdatePathwayTag> {

      return tags;
    }

    public setTags(tags: Array<UpdatePathwayTag>): void {

      this.tags = tags;

    }

    public getUserTaxonomyTopics(): Array<string> {

      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }

    public getShareUrl(): string {

      return shareUrl;
    }

    public setShareUrl(shareUrl: string): void {

      this.shareUrl = shareUrl;

    }

    public getSlug(): string {

      return slug;
    }

    public setSlug(slug: string): void {

      this.slug = slug;

    }

    public getSourceId(): string {

      return sourceId;
    }

    public setSourceId(sourceId: string): void {

      this.sourceId = sourceId;

    }
    public getExternalId(): string {
      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getId(): string {

      return id;
    }

    public setId(id: string): void {

      this.id = id;

    }

    public getCreatedAt(): string {

      return createdAt;
    }

    public setCreatedAt(createdAt: string): void {

      this.createdAt = createdAt;

    }

}
