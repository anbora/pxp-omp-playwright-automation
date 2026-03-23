import { Expose } from "common/testing/json";

export class Location {

    private city: string;
    private countryCode: string;
    private latitude: number;
    private locationId: string;
    private longitude: number;
    private name: string;
    private primary: boolean;
    private region: string;
    private postCode: string;

    public getCity(): string {

      return city;
    }

    public setCity(city: string): void {

      this.city = city;

    }

    public getCountryCode(): string {

      return countryCode;
    }

    public setCountryCode(countryCode: string): void {

      this.countryCode = countryCode;

    }

    public getLatitude(): number {

      return latitude;
    }

    public setLatitude(latitude: number): void {

      this.latitude = latitude;

    }

    public getLocationId(): string {

      return locationId;
    }

    public setLocationId(locationId: string): void {

      this.locationId = locationId;

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

    public getPostCode(): string {

      return postCode;
    }

    public setPostCode(postCode: string): void {

      this.postCode = postCode;

    }
}
