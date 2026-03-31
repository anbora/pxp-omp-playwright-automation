// @ts-nocheck
import { FunctionalArea } from "common/annotations/FunctionalArea";
import { Group } from "common/annotations/Group";

type AnnotatedTarget = {
  functionalArea?: FunctionalArea;
  group?: Group;
  isMobile?: boolean;
  portalIndex?: number;
};

export class AnnotationHandler {
  getGroup(clazz: AnnotatedTarget) {
    return clazz?.group;
  }

  getFunctionalArea(clazz: AnnotatedTarget) {
    return clazz?.functionalArea;
  }

  isMobileTest(clazz: AnnotatedTarget) {
    return Boolean(clazz?.isMobile);
  }

  isMobileDriver() {
    return System.getProperty("driver", "chrome") === "mobile";
  }

  isRestAssuredTest(groupParam: string) {
    return groupParam === "restAssured";
  }

  getPortalIndex(clazz: AnnotatedTarget) {
    return clazz?.portalIndex ?? 0;
  }
}
