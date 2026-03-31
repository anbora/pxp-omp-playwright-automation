// @ts-nocheck
import { Expose } from "common/testing/json";
import { HiringManagers } from "models/job/HiringManagers";
import { JobDescription } from "models/job/JobDescription";
import { LinkedRole } from "models/job/LinkedRole";
import { Location } from "models/job/Location";
import { Organization } from "models/job/Organization";
import { Recruiters } from "models/job/Recruiters";
import { Salary } from "models/job/Salary";

export class JobModel {

    private careerTrack: string;
    private company: string;
    private contractType: string;
    private endDateTime: string;
    private hiringManagers: Array<HiringManagers>;
    private id: string;
    private jobDescriptions: Array<JobDescription>;
    private level: string;
    private linkedRoles: Array<LinkedRole>;
    private location: Array<Location>;
    private organization: Array<Organization>;
    private recruiters: Array<Recruiters>;
    private referenceNumber: string;
    private remote: string;
    private salary: Salary;
    private scheduleType: string;
    private source: string;
    private startDateTime: string;
    private status: string;

    public getCareerTrack(): string {

      return careerTrack;
    }

    public setCareerTrack(careerTrack: string): void {

      this.careerTrack = careerTrack;

    }

    public getCompany(): string {

      return company;
    }

    public setCompany(company: string): void {

      this.company = company;

    }

    public getContractType(): string {

      return contractType;
    }

    public setContractType(contractType: string): void {

      this.contractType = contractType;

    }

    public getEndDateTime(): string {

      return endDateTime;
    }

    public setEndDateTime(endDateTime: string): void {

      this.endDateTime = endDateTime;

    }

    public getHiringManagers(): Array<HiringManagers> {

      return hiringManagers;
    }

    public setHiringManagers(hiringManagers: Array<HiringManagers>): void {

      this.hiringManagers = hiringManagers;

    }

    public getId(): string {

      return id;
    }

    public setId(id: string): void {

      this.id = id;

    }

    public getJobDescriptions(): Array<JobDescription> {

      return jobDescriptions;
    }

    public setJobDescriptions(jobDescriptions: Array<JobDescription>): void {

      this.jobDescriptions = jobDescriptions;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getLinkedRoles(): Array<LinkedRole> {

      return linkedRoles;
    }

    public setLinkedRoles(linkedRoles: Array<LinkedRole>): void {

      this.linkedRoles = linkedRoles;

    }

    public getLocation(): Array<Location> {

      return location;
    }

    public setLocation(location: Array<Location>): void {

      this.location = location;

    }

    public getOrganization(): Array<Organization> {

      return organization;
    }

    public setOrganization(organization: Array<Organization>): void {

      this.organization = organization;

    }

    public getRecruiters(): Array<Recruiters> {

      return recruiters;
    }

    public setRecruiters(recruiters: Array<Recruiters>): void {

      this.recruiters = recruiters;

    }

    public getReferenceNumber(): string {

      return referenceNumber;
    }

    public setReferenceNumber(referenceNumber: string): void {

      this.referenceNumber = referenceNumber;

    }

    public getRemote(): string {

      return remote;
    }

    public setRemote(remote: string): void {

      this.remote = remote;

    }

    public getSalary(): Salary {

      return salary;
    }

    public setSalary(salary: Salary): void {

      this.salary = salary;

    }

    public getScheduleType(): string {

      return scheduleType;
    }

    public setScheduleType(scheduleType: string): void {

      this.scheduleType = scheduleType;

    }

    public getSource(): string {

      return source;
    }

    public setSource(source: string): void {

      this.source = source;

    }

    public getStartDateTime(): string {

      return startDateTime;
    }

    public setStartDateTime(startDateTime: string): void {

      this.startDateTime = startDateTime;

    }

    public getStatus(): string {

      return status;
    }

    public setStatus(status: string): void {

      this.status = status;

    }
}
