import { Effects } from "undux";
import { StoreInterface } from "./Store";
import { URLData } from "./URLData/URLData";
import { dbManipulator } from "./Storage";

export const withIndexDB: Effects<StoreInterface> = store => {
  store.on("urls").subscribe((urls: URLData[]) => {
    const req = dbManipulator(objStore => {
      urls.forEach(url => {
        objStore.put(url);
      });
    });
    console.log(urls);
  });
  return store;
};
