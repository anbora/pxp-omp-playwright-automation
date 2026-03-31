// @ts-nocheck
import { BasePage } from "common/BasePage";

export interface BaseScenario<Input extends BasePage = BasePage, Output extends BasePage = BasePage> {
  run(entry: Input): Output;
}
