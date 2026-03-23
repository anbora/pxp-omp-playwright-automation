export interface API {
  __api?: true;
}

export function isApiTest(target: { API?: boolean } | null | undefined) {
  return Boolean(target?.API);
}
