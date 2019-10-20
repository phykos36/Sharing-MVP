import { Effects } from "undux";
import { StoreInterface } from "./Store";
import { dbManipulator } from "./Storage";
import { zip } from "rxjs";
import { IURL } from "./URL/IURL";

export const withIndexDB: Effects<StoreInterface> = store => {
  store.on("urls").subscribe((urls: IURL[]) => {
    dbManipulator(objStore => {
      const getAllKeysReq = objStore.getAllKeys();
      getAllKeysReq.addEventListener("success", event => {
        const req = event.target as IDBRequest;
        const existingKeys = req.result as number[];
        const deletedElements = existingKeys.filter(
          key => urls.map(x => x.id).indexOf(key) == -1
        );
        if (deletedElements.length !== 0) {
          deletedElements.forEach(elementId => objStore.delete(elementId));
        }
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
  });
  return store;
};
