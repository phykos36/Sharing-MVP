export interface URLData {
  createdAt: Date;
  href: string;
  id?: number;
  invisibleCause: INVISIBLE_CAUSE;
}

export const CLICKED_URL = "CLICKED_URL";
export const EXCEED_DAY = "EXCEED_DAY";
export const NOT_EXPIRED = "NOT_EXPIRED";

type INVISIBLE_CAUSE =
  | typeof CLICKED_URL
  | typeof EXCEED_DAY
  | typeof NOT_EXPIRED;

const DELTA_TIME_BY_DELETE = 10 * 24 * 60 * 60 * 1000;

export class ExtendedURL {
  private urlData: URLData;
  public static generate(url: URLData): ExtendedURL {
    const extendURL = new ExtendedURL(url);
    if (extendURL.getRemainTimeMs() < 0) {
      extendURL.invisibleCause = EXCEED_DAY;
    }
    return extendURL;
  }
  private constructor(url: URLData) {
    this.urlData = url;
  }
  get id(): number {
    return this.urlData.id;
  }
  public getRemainTimeMs(): number {
    return (
      this.urlData.createdAt.getTime() +
      DELTA_TIME_BY_DELETE -
      new Date().getTime()
    );
  }
  public getRemainTime(): number[] {
    const HOUR_MS = 60 * 60 * 1000;
    const DAY_MS = 24 * HOUR_MS;
    let ms = this.getRemainTimeMs();
    const day = Math.floor(ms / DAY_MS);
    ms -= day * DAY_MS;
    const hour = Math.floor(ms / HOUR_MS);
    return [day, hour];
  }
  set invisibleCause(cause: INVISIBLE_CAUSE) {
    this.urlData.invisibleCause = cause;
  }
  public build(): URLData {
    return Object.assign({}, this.urlData);
  }
}
