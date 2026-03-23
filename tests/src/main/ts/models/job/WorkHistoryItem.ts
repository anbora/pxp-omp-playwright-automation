export class WorkHistoryItem {
    private timePeriod: string;
    private roleName: string;
    private companyName: string;

    public getTimePeriod(): string {

      return timePeriod;
    }

    public setTimePeriod(timePeriod: string): void {

      this.timePeriod = timePeriod;

    }

    public getRoleName(): string {

      return roleName;
    }

    public setRoleName(roleName: string): void {

      this.roleName = roleName;

    }

    public getCompanyName(): string {

      return companyName;
    }

    public setCompanyName(companyName: string): void {

      this.companyName = companyName;

    }

    public equals(o: any): boolean {
        if (this == o) return true;
        if (!(o instanceof WorkHistoryItem that)) return false;
        return Objects.equals(getTimePeriod(), that.getTimePeriod()) && Objects.equals(getRoleName(), that.getRoleName()) && Objects.equals(getCompanyName(), that.getCompanyName());
    }

    public hashCode(): number {

      return Objects.hash(getTimePeriod(), getRoleName(), getCompanyName());

    }

    public toString(): string {
        return "WorkHistoryItem{" +
                "timePeriod='" + timePeriod + '\'' +
                ", roleName='" + roleName + '\'' +
                ", companyName='" + companyName + '\'' +
                '}';
    }
}
