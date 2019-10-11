import { createConnectedStore } from "undux";
import { URLData } from "./URLData/URLData";

interface Store {
  href: string;
  urls: URLData[];
}

export const Store = createConnectedStore<Store>({
  href: "",
  urls: []
});
