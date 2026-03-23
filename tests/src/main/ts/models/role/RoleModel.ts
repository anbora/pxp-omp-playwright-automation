import { SerializedName } from "common/testing/json";

export class RoleModel {

    private careerTrack: string;
    private description: string;
    private externalId: string;
    private familyId: string;
    private jobDescription: string;
    private jobLevel: string;
    private nextRolesData: Array<any>;
    private otherDescription: string;
    private skills: Array<any>;
    private status: string;
    private title: string;
    private visibility: boolean;

    public getCareerTrack(): string {

      return careerTrack;
    }

    public setCareerTrack(careerTrack: string): void {

      this.careerTrack = careerTrack;

    }

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

    }

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getFamilyId(): string {

      return familyId;
    }

    public setFamilyId(familyId: string): void {

      this.familyId = familyId;

    }

    public getJobDescription(): string {

      return jobDescription;
    }

    public setJobDescription(jobDescription: string): void {

      this.jobDescription = jobDescription;

    }

    public getJobLevel(): string {

      return jobLevel;
    }

    public setJobLevel(jobLevel: string): void {

      this.jobLevel = jobLevel;

    }

    public getNextRolesData(): Array<any> {

      return nextRolesData;
    }

    public setNextRolesData(nextRolesData: Array<any>): void {

      this.nextRolesData = nextRolesData;

    }

    public getOtherDescription(): string {

      return otherDescription;
    }

    public setOtherDescription(otherDescription: string): void {

      this.otherDescription = otherDescription;

    }

    public getSkills(): Array<any> {

      return skills;
    }

    public setSkills(skills: Array<any>): void {

      this.skills = skills;

    }

    public getStatus(): string {

      return status;
    }

    public setStatus(status: string): void {

      this.status = status;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

    public getVisibility(): boolean {

      return visibility;
    }

    public setVisibility(visibility: boolean): void {

      this.visibility = visibility;

    }

}
