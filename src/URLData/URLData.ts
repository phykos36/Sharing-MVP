export interface URLData {
  createdAt: Date;
  href: string;
  id?: number;
  invisibleCause: INVISIBLE_CAUSE;
}

/*export const CLICKED_URL = Symbol("CLICKED_URL");
export const EXCEED_DAY = Symbol("EXCEED_DAY");
export const NOT_EXPIRED = Symbol("NOT_EXPIRED");
*/

export const CLICKED_URL = "CLICKED_URL";
export const EXCEED_DAY = "EXCEED_DAY";
export const NOT_EXPIRED = "NOT_EXPIRED";

type INVISIBLE_CAUSE =
  | typeof CLICKED_URL
  | typeof EXCEED_DAY
  | typeof NOT_EXPIRED;
