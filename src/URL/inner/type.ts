export const CLICKED_URL = "CLICKED_URL";
export const EXCEED_DAY = "EXCEED_DAY";
export const NOT_EXPIRED = "NOT_EXPIRED";

export type INVISIBLE_CAUSE =
  | typeof CLICKED_URL
  | typeof EXCEED_DAY
  | typeof NOT_EXPIRED;
