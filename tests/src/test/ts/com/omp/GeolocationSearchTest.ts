// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { UserModel } from "models/user/UserModel";

export class GeolocationSearchTest extends BaseRestTest {

    private london: string = "London";
    private londonFullName: string = "London, United Kingdom";
    private dusseldorf: string = "Dusseldorf";
    private dusseldorfSC: string = "Düsseldorf";
    private dusseldorfFullName: string = "Dusseldorf, North Rhine-Westphalia, Germany";
    private kobenhavn: string = "København";
    private kobenhavnFullName: string = "1357 København K, Denmark";
    private krakow: string = "Kraków";
    private wuxi: string = "无锡";
    private wuxiFullName: string = "Wuxi City, Jiangsu, China";
    private krakowFullName: string = "Krakow, Lesser Poland Voivodeship, Poland";
    private randomCharacters: string = "hggdjretre";
    private specialSigns: string = "?!@#$";
    private six: string = "6";
    private two: string = "2";
    private one: string = "1";
    private zero: string = "0";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public checkIfGeolocationsWillBeFoundIfUserProvidesSomeUnstressedCharactersAndTheMostMatchingLocationIsFirstOnTheListOfResults(): void {
        this.loginToMainUser();
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.london));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "results[0]/formatted", this.londonFullName);
        this.apiAssertions.assertEqual(response, "total_results", this.six);
    }

    public checkIfExactlyOneGeolocationWithoutGermanSpecialSignWillBeFound(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.dusseldorf));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "results[0]/formatted", this.dusseldorfFullName);
        this.apiAssertions.assertEqual(response, "total_results", this.one);
    }

    public checkIfExactlyOneGeolocationWithGermanSpecialSignWillBeFound(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.dusseldorfSC));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "results[0]/formatted", this.dusseldorfFullName);
        this.apiAssertions.assertEqual(response, "total_results", this.one);
    }

    public checkIfExactlyOneGeolocationWithDanishSpecialSignWillBeFound(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.kobenhavn));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "results[0]/formatted", this.kobenhavnFullName);
        this.apiAssertions.assertEqual(response, "total_results", this.one);
    }

    public checkIfExactlyOneGeolocationWithPolishSpecialSignWillBeFound(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.krakow));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "results[0]/formatted", this.krakowFullName);
        this.apiAssertions.assertEqual(response, "total_results", this.two);
    }

    public checkIfUserCanFindLocationByTwoLetters(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.wuxi));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "results[0]/formatted", this.wuxiFullName);
        this.apiAssertions.assertEqual(response, "total_results", this.one);
    }

    public checkIfNoGeolocationIsReturnedIfUserProvidesRandomInput(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.randomCharacters));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "total_results", this.zero);
    }

    public checkIfGeolocationWithSpecialCharactersDoesNotExist(): void {
        let response: APIResponse = this.getInternalRequest(mainUserInternalRequest, String.format(EndpointsEnum.GEOLOCATION_ENDPOINT.getEndpoint(), this.specialSigns));

        Assert.assertEquals(response.status(), 200);
        this.apiAssertions.assertEqual(response, "total_results", this.zero);
    }
}
