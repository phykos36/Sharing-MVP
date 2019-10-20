import { IURL } from "../IURL";
import {
  EXCEED_DAY,
  NOT_EXPIRED,
  INVISIBLE_CAUSE,
  CLICKED_URL
} from "../inner/type";

const DELTA_TIME_BY_DELETE = 10 * 24 * 60 * 60 * 1000;

export class ExtendURL {
  private urlData: IURL;
  public static generate(url: IURL): ExtendURL {
    const extendURL = new ExtendURL(url);
    if (
      extendURL.getRemainTimeMs() < 0 &&
      extendURL.invisibleCause === NOT_EXPIRED
    ) {
      extendURL.invisibleCause = EXCEED_DAY;
    }
    return extendURL;
  }
  private constructor(url: IURL) {
    this.urlData = url;
  }
  public clickedURL() {
    if (this.urlData.invisibleCause === NOT_EXPIRED) {
      this.urlData.invisibleCause = CLICKED_URL;
    }
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
  public isExpired(): boolean {
    return this.getRemainTimeMs() < 0;
  }
  set invisibleCause(cause: INVISIBLE_CAUSE) {
    this.urlData.invisibleCause = cause;
  }
  public build(): IURL {
    return Object.assign({}, this.urlData);
  }
}

export function updateURLVisible(url: IURL): IURL {
  const u = ExtendURL.generate(url);
  return u.build();
}
