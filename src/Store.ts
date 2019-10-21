import { createConnectedStore } from "undux";
import { withIndexDB } from "./withIndexDB";
import { IURL } from "./URL/IURL";

export interface IStore {
  href: string;
  urls: IURL[];
}

export const Store = createConnectedStore<IStore>(
  {
    href: "",
    urls: [],
  },
  withIndexDB,
);
