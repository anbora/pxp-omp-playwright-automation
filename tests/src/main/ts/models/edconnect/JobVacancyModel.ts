// @ts-nocheck
import { Expose } from "common/testing/json";
import { HiringManagers } from "models/edconnect/HiringManagers";
import { JobDescription } from "models/edconnect/JobDescription";
import { LinkedRoles } from "models/edconnect/LinkedRoles";
import { Locations } from "models/edconnect/Locations";
import { Organizations } from "models/edconnect/Organizations";
import { Recruiters } from "models/edconnect/Recruiters";
import { Salary } from "models/edconnect/Salary";

export class JobVacancyModel {

    private career_track: string;
    private company: string;
    private contract_type: string;
    private end_date_time: string;
    private hiring_managers: Array<HiringManagers>;
    private id: string;
    private job_descriptions: Array<JobDescription>;
    private level: string;
    private linked_roles: Array<LinkedRoles>;
    private locations: Array<Locations>;
    private organizations: Array<Organizations>;
    private recruiters: Array<Recruiters>;
    private reference_number: string;
    private remote: string;
    private salary: Salary;
    private schedule_type: string;
    private source: string;
    private start_date_time: string;
    private status: string;

    public getCareer_track(): string {

      return career_track;
    }

    public setCareer_track(career_track: string): void {

      this.career_track = career_track;

    }

    public getCompany(): string {

      return company;
    }

    public setCompany(company: string): void {

      this.company = company;

    }

    public getContract_type(): string {

      return contract_type;
    }

    public setContract_type(contract_type: string): void {

      this.contract_type = contract_type;

    }

    public getEnd_date_time(): string {

      return end_date_time;
    }

    public setEnd_date_time(end_date_time: string): void {

      this.end_date_time = end_date_time;

    }

    public getHiring_managers(): Array<HiringManagers> {

      return hiring_managers;
    }

    public setHiring_managers(hiring_managers: Array<HiringManagers>): void {

      this.hiring_managers = hiring_managers;

    }

    public getId(): string {

      return id;
    }

    public setId(id: string): void {

      this.id = id;

    }

    public getJob_descriptions(): Array<JobDescription> {

      return job_descriptions;
    }

    public setJob_descriptions(job_descriptions: Array<JobDescription>): void {

      this.job_descriptions = job_descriptions;

    }

    public getLevel(): string {

      return level;
    }

    public setLevel(level: string): void {

      this.level = level;

    }

    public getLinked_roles(): Array<LinkedRoles> {

      return linked_roles;
    }

    public setLinked_roles(linked_roles: Array<LinkedRoles>): void {

      this.linked_roles = linked_roles;

    }

    public getLocations(): Array<Locations> {

      return locations;
    }

    public setLocations(locations: Array<Locations>): void {

      this.locations = locations;

    }

    public getOrganizations(): Array<Organizations> {

      return organizations;
    }

    public setOrganizations(organizations: Array<Organizations>): void {

      this.organizations = organizations;

    }

    public getRecruiters(): Array<Recruiters> {

      return recruiters;
    }

    public setRecruiters(recruiters: Array<Recruiters>): void {

      this.recruiters = recruiters;

    }

    public getReference_number(): string {

      return reference_number;
    }

    public setReference_number(reference_number: string): void {

      this.reference_number = reference_number;

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

    public getSchedule_type(): string {

      return schedule_type;
    }

    public setSchedule_type(schedule_type: string): void {

      this.schedule_type = schedule_type;

    }

    public getSource(): string {

      return source;
    }

    public setSource(source: string): void {

      this.source = source;

    }

    public getStart_date_time(): string {

      return start_date_time;
    }

    public setStart_date_time(start_date_time: string): void {

      this.start_date_time = start_date_time;

    }

    public getStatus(): string {

      return status;
    }

    public setStatus(status: string): void {

      this.status = status;

    }
}
