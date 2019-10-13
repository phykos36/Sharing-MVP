import { Effects } from "undux";
import { StoreInterface } from "./Store";
import { URLData } from "./URLData/URLData";
import { dbManipulator } from "./Storage";

export const withIndexDB: Effects<StoreInterface> = store => {
  store.on("urls").subscribe((urls: URLData[]) => {
    dbManipulator(objStore => {
      urls.forEach((url, i) => {
        const req = objStore.put(url);
        if (!url.id) {
          req.addEventListener("success", event => {
            const req = event.target as IDBRequest;
            const urlID = req.result as number;
            if (urlID) {
              const newURLs = urls.slice(0, urls.length);
              newURLs[i].id = urlID;
              store.set("urls")(newURLs);
            }
          });
        }
      });
    });
  });
  return store;
};
