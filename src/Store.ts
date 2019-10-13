import { createConnectedStore } from "undux";
import { URLData } from "./URLData/URLData";
import { withIndexDB } from "./withLocalStorage";

export interface StoreInterface {
  href: string;
  urls: URLData[];
}

export const Store = createConnectedStore<StoreInterface>(
  {
    href: "",
    urls: []
  },
  withIndexDB
);
