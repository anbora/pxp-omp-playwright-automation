// @ts-nocheck
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";

export interface FunctionalArea {
  value: FunctionalAreaEnum;
  team?: TeamsResponsibleEnum;
}
