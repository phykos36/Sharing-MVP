import { dbManipulator } from "./Storage";
import { IStore } from "./Store";
import { IURL } from "./URL/IURL";
import { Effects } from "undux";

export const withIndexDB: Effects<IStore> = (store) => {
  store.on("urls").subscribe((urls: IURL[]) => {
    dbManipulator((objStore) => {
      const getAllKeysReq = objStore.getAllKeys();
      getAllKeysReq.addEventListener("success", (event) => {
        const req = event.target as IDBRequest;
        const existingKeys = req.result as number[];
        const deletedElements = existingKeys.filter(
          (key) => urls.map((x) => x.id).indexOf(key) === -1,
        );
        if (deletedElements.length !== 0) {
          deletedElements.forEach((elementId) => objStore.delete(elementId));
        }
        urls.forEach((url, i) => {
          const idbReq = objStore.put(url);
          if (!url.id) {
            idbReq.addEventListener("success", (successEvent) => {
              const successIDBReq = event.target as IDBRequest;
              const urlID = successIDBReq.result as number;
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
