// @ts-nocheck
export interface PageModel {
  pageName: string;
  url: string;
  checkUrl?: boolean;
}

export function getPageModel(target: { pageModel?: PageModel } | null | undefined) {
  return target?.pageModel;
}
