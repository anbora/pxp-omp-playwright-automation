// @ts-nocheck
import { Expose } from "common/testing/json";

export class Resource {

    private title: string;
    private url: string;

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
