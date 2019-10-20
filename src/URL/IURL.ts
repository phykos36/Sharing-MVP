import { INVISIBLE_CAUSE, NOT_EXPIRED } from "./inner/type";

export interface IURL {
  createdAt: Date;
  href: string;
  id?: number;
  invisibleCause: INVISIBLE_CAUSE;
}

export function generateURL(href: string): IURL {
  return { createdAt: new Date(), href, invisibleCause: NOT_EXPIRED };
}
