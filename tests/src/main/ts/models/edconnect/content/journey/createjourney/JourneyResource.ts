import { Expose } from "common/testing/json";

export class JourneyResource {
    private description: string;
    private title: string;
    private url: string;

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

    public getUrl(): string {

      return url;
    }

    public setUrl(url: string): void {

      this.url = url;

    }
}
