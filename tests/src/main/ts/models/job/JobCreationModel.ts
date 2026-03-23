import { SerializedName } from "common/testing/json";
import { JobDescription } from "models/job/JobDescription";
import { Location } from "models/job/Location";
import { Salary } from "models/job/Salary";

export class JobCreationModel {

    private mCareerTrack: string;
    private mCategory: Array<string>;
    private mCompany: string;
    private mContractType: string;
    private mDivision: string;
    private mEndDateTime: string;
    private mGrade: string;
    private mId: string;
    private mJobDescriptions: Array<JobDescription>;
    private mJobFamily: Array<string>;
    private mLevel: string;
    private mLinkedRoles: Array<any>;
    private mLocation: Array<Location>;
    private mReferenceNumber: string;
    private mRemote: string;
    private mSalary: Salary;
    private mScheduleType: string;
    private mSource: string;
    private mStartDateTime: string;
    private mStatus: string;

    public getCareerTrack(): string {

      return mCareerTrack;
    }

    public setCareerTrack(careerTrack: string): void {

    mCareerTrack:  = careerTrack;

    }

    public getCategory(): Array<string> {

      return mCategory;
    }

    public setCategory(category: Array<string>): void {

    mCategory:  = category;

    }

    public getCompany(): string {

      return mCompany;
    }

    public setCompany(company: string): void {

    mCompany:  = company;

    }

    public getContractType(): string {

      return mContractType;
    }

    public setContractType(contractType: string): void {

    mContractType:  = contractType;

    }

    public getDivision(): string {

      return mDivision;
    }

    public setDivision(division: string): void {

    mDivision:  = division;

    }

    public getEndDateTime(): string {

      return mEndDateTime;
    }

    public setEndDateTime(endDateTime: string): void {

    mEndDateTime:  = endDateTime;

    }

    public getGrade(): string {

      return mGrade;
    }

    public setGrade(grade: string): void {

    mGrade:  = grade;

    }

    public getId(): string {

      return mId;
    }

    public setId(id: string): void {

    mId:  = id;

    }

    public getJobDescriptions(): Array<JobDescription> {

      return mJobDescriptions;
    }

    public setJobDescriptions(jobDescriptions: Array<JobDescription>): void {

    mJobDescriptions:  = jobDescriptions;

    }

    public getJobFamily(): Array<string> {

      return mJobFamily;
    }

    public setJobFamily(jobFamily: Array<string>): void {

    mJobFamily:  = jobFamily;

    }

    public getLevel(): string {

      return mLevel;
    }

    public setLevel(level: string): void {

    mLevel:  = level;

    }

    public getLinkedRoles(): Array<any> {

      return mLinkedRoles;
    }

    public setLinkedRoles(linkedRoles: Array<any>): void {

    mLinkedRoles:  = linkedRoles;

    }

    public getLocation(): Array<Location> {

      return mLocation;
    }

    public setLocation(location: Array<Location>): void {

    mLocation:  = location;

    }

    public getReferenceNumber(): string {

      return mReferenceNumber;
    }

    public setReferenceNumber(referenceNumber: string): void {

    mReferenceNumber:  = referenceNumber;

    }

    public getRemote(): string {

      return mRemote;
    }

    public setRemote(remote: string): void {

    mRemote:  = remote;

    }

    public getSalary(): Salary {

      return mSalary;
    }

    public setSalary(salary: Salary): void {

    mSalary:  = salary;

    }

    public getScheduleType(): string {

      return mScheduleType;
    }

    public setScheduleType(scheduleType: string): void {

    mScheduleType:  = scheduleType;

    }

    public getSource(): string {

      return mSource;
    }

    public setSource(source: string): void {

    mSource:  = source;

    }

    public getStartDateTime(): string {

      return mStartDateTime;
    }

    public setStartDateTime(startDateTime: string): void {

    mStartDateTime:  = startDateTime;

    }

    public getStatus(): string {

      return mStatus;
    }

    public setStatus(status: string): void {

    mStatus:  = status;

    }

}
