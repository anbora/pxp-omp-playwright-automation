import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateLanguage } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateLanguage";
import { UpdateQuiz } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuiz";
import { UpdateQuizMetadata } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizMetadata";

export class UpdateQuizContent {

    private author: any;
    private channels: Array<any>;
    private contributors: Array<any>;
    private createdAt: string;
    private duration: any;
    private expirationDate: any;
    private externalId: string;
    private id: string;
    private isPaid: boolean;
    private isPrivate: boolean;
    private languages: Array<UpdateLanguage>;
    private level: any;
    private metadata: UpdateQuizMetadata;
    private plan: string;
    private prices: Array<any>;
    private provider: string;
    private publishedAt: string;
    private quiz: UpdateQuiz;
    private readableContentType: string;
    private shareUrl: string;
    private slug: string;
    private sourceDisplayName: string;
    private sourceId: string;
    private sourceTypeName: string;
    private state: string;
    private tags: Array<any>;
    private teams: Array<any>;
    private userTaxonomyTopics: Array<string>;

    public getAuthor(): any {

      return author;
    }

    public setAuthor(author: any): void {

      this.author = author;

    }

    public getChannels(): Array<any> {

      return channels;
    }

    public setChannels(channels: Array<any>): void {

      this.channels = channels;

    }

    public getContributors(): Array<any> {

      return contributors;
    }

    public setContributors(contributors: Array<any>): void {

      this.contributors = contributors;

    }

    public getCreatedAt(): string {

      return createdAt;
    }

    public setCreatedAt(createdAt: string): void {

      this.createdAt = createdAt;

    }

    public getDuration(): any {

      return duration;
    }

    public setDuration(duration: any): void {

      this.duration = duration;

    }

    public getExpirationDate(): any {

      return expirationDate;
    }

    public setExpirationDate(expirationDate: any): void {

      this.expirationDate = expirationDate;

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

    public getIsPaid(): boolean {

      return isPaid;
    }

    public setIsPaid(isPaid: boolean): void {

      this.isPaid = isPaid;

    }

    public getIsPrivate(): boolean {

      return isPrivate;
    }

    public setIsPrivate(isPrivate: boolean): void {

      this.isPrivate = isPrivate;

    }

    public getLanguages(): Array<UpdateLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdateLanguage>): void {

      this.languages = languages;

    }

    public getLevel(): any {

      return level;
    }

    public setLevel(level: any): void {

      this.level = level;

    }

    public getMetadata(): UpdateQuizMetadata {

      return metadata;
    }

    public setMetadata(metadata: UpdateQuizMetadata): void {

      this.metadata = metadata;

    }

    public getPlan(): string {

      return plan;
    }

    public setPlan(plan: string): void {

      this.plan = plan;

    }

    public getPrices(): Array<any> {

      return prices;
    }

    public setPrices(prices: Array<any>): void {

      this.prices = prices;

    }

    public getProvider(): string {

      return provider;
    }

    public setProvider(provider: string): void {

      this.provider = provider;

    }

    public getPublishedAt(): string {

      return publishedAt;
    }

    public setPublishedAt(publishedAt: string): void {

      this.publishedAt = publishedAt;

    }

    public getQuiz(): UpdateQuiz {

      return quiz;
    }

    public setQuiz(quiz: UpdateQuiz): void {

      this.quiz = quiz;

    }

    public getReadableContentType(): string {

      return readableContentType;
    }

    public setReadableContentType(readableContentType: string): void {

      this.readableContentType = readableContentType;

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

    public getSourceDisplayName(): string {

      return sourceDisplayName;
    }

    public setSourceDisplayName(sourceDisplayName: string): void {

      this.sourceDisplayName = sourceDisplayName;

    }

    public getSourceId(): string {

      return sourceId;
    }

    public setSourceId(sourceId: string): void {

      this.sourceId = sourceId;

    }

    public getSourceTypeName(): string {

      return sourceTypeName;
    }

    public setSourceTypeName(sourceTypeName: string): void {

      this.sourceTypeName = sourceTypeName;

    }

    public getState(): string {

      return state;
    }

    public setState(state: string): void {

      this.state = state;

    }

    public getTags(): Array<any> {

      return tags;
    }

    public setTags(tags: Array<any>): void {

      this.tags = tags;

    }

    public getTeams(): Array<any> {

      return teams;
    }

    public setTeams(teams: Array<any>): void {

      this.teams = teams;

    }

    public getUserTaxonomyTopics(): Array<string> {

      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }

}
