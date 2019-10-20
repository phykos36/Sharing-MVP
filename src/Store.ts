import { createConnectedStore } from "undux";
import { withIndexDB } from "./withIndexDB";
import { IURL } from "./URL/IURL";

export interface StoreInterface {
  href: string;
  urls: IURL[];
}

export const Store = createConnectedStore<StoreInterface>(
  {
    href: "",
    urls: []
  },
  withIndexDB
);
