import { Expose } from "common/testing/json";

export class OrganizationModel {

    private cardContext: string;
    private filterInActive: boolean;
    private ids: Array<string>;
    private resolveAllParents: boolean;
    private resolveParent: boolean;
    private visibilityContext: string;

    public getCardContext(): string {

      return cardContext;
    }

    public setCardContext(cardContext: string): void {

      this.cardContext = cardContext;

    }

    public getFilterInActive(): boolean {

      return filterInActive;
    }

    public setFilterInActive(filterInActive: boolean): void {

      this.filterInActive = filterInActive;

    }

    public getIds(): Array<string> {

      return ids;
    }

    public setIds(ids: Array<string>): void {

      this.ids = ids;

    }

    public getResolveAllParents(): boolean {

      return resolveAllParents;
    }

    public setResolveAllParents(resolveAllParents: boolean): void {

      this.resolveAllParents = resolveAllParents;

    }

    public getResolveParent(): boolean {

      return resolveParent;
    }

    public setResolveParent(resolveParent: boolean): void {

      this.resolveParent = resolveParent;

    }

    public getVisibilityContext(): string {

      return visibilityContext;
    }

    public setVisibilityContext(visibilityContext: string): void {

      this.visibilityContext = visibilityContext;

    }

}
