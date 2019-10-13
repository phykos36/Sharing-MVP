import { URLData } from "./URLData/URLData";

export function openURLDB(): IDBOpenDBRequest {
  const req = indexedDB.open("AlphaDB", 1);

  // TODO: 拒否されたら別の手段で保存する
  req.addEventListener("error", event => {
    console.error(req.error);
  });
  return req;
}

export function dbManipulator(callback: (store: IDBObjectStore) => void): void {
  const req = openURLDB();

  req.addEventListener("success", event => {
    const db: IDBDatabase = req.result;
    const transaction = db.transaction("url", "readwrite");
    const objStore = transaction.objectStore("url");
    callback(objStore);
  });
}

export function dbAll() {
  const req = openURLDB();

  req.addEventListener("success", event => {
    const db: IDBDatabase = req.result;
    const transaction = db.transaction("url", "readwrite");
    const store = transaction.objectStore("url");
  });

  req.addEventListener("upgradeneeded", event => {
    console.log("upgrade");
    const db: IDBDatabase = req.result;
    const objStore = db.createObjectStore("url", {
      keyPath: "id",
      autoIncrement: true
    });

    objStore.transaction.addEventListener("oncomplete", event => {
      const urlObjStore = db.transaction("url", "readwrite").objectStore("url");
      console.log("hey");
    });
  });
}
