import { Expose } from "common/testing/json";

export class Locations {

    private city: string;
    private country_code: string;
    private latitude: number;
    private location_id: string;
    private longitude: number;
    private name: string;
    private primary: boolean;
    private region: string;
    private post_code: string;

    public getCity(): string {

      return city;
    }

    public setCity(city: string): void {

      this.city = city;

    }

    public getCountry_code(): string {

      return country_code;
    }

    public setCountry_code(country_code: string): void {

      this.country_code = country_code;

    }

    public getLatitude(): number {

      return latitude;
    }

    public setLatitude(latitude: number): void {

      this.latitude = latitude;

    }

    public getLocation_id(): string {

      return location_id;
    }

    public setLocation_id(location_id: string): void {

      this.location_id = location_id;

    }

    public getLongitude(): number {

      return longitude;
    }

    public setLongitude(longitude: number): void {

      this.longitude = longitude;

    }

    public getName(): string {

      return name;
    }

    public setName(name: string): void {

      this.name = name;

    }

    public getPrimary(): boolean {

      return primary;
    }

    public setPrimary(primary: boolean): void {

      this.primary = primary;

    }

    public getRegion(): string {

      return region;
    }

    public setRegion(region: string): void {

      this.region = region;

    }

    public getPost_code(): string {

      return post_code;
    }

    public setPost_code(post_code: string): void {

      this.post_code = post_code;

    }
}
