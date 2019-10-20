import React from "react";
import {
  URLData,
  CLICKED_URL,
  EXCEED_DAY,
  NOT_EXPIRED
} from "../../URLData/URLData";
import { Store, StoreInterface } from "../../Store";
import { dbManipulator } from "../../Storage";
import { URLRegister } from "../molecules/URLRegister/URLRegister";
import { URLItem } from "../molecules/URLItem/URLItem";

class UrlAreaComponent extends React.Component<{ store }> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const store = this.props.store;
    dbManipulator(objStore => {
      const getReq = objStore.getAll();
      getReq.onsuccess = event => {
        let urls: URLData[] = getReq.result;
        const deltaTimeByDelete = 10 * 24 * 60 * 60 * 1000;
        urls = urls.map((url: URLData) => {
          if (
            url.createdAt.getTime() + deltaTimeByDelete <
            new Date().getTime()
          ) {
            url.invisibleCause = EXCEED_DAY;
          }
          return url;
        });
        store.set("urls")(urls);
      };
    });
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const store = this.props.store;
    store.set("href")(event.currentTarget.value);
  }

  // TODO: 10個こえたらはみ出たものの削除 #6
  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const store = this.props.store;
    const href = store.get("href") as string;
    const urls = store.get("urls") as URLData[];

    store.set("href")("");
    store.set("urls")([
      ...urls,
      { createdAt: new Date(), href, invisibleCause: NOT_EXPIRED }
    ]);
  }

  handleURLClicked(urlId: number) {
    const store = this.props.store;
    const urls = store.get("urls") as URLData[];
    const changedIndex = urls.findIndex(url => url.id === urlId);
    urls[changedIndex].invisibleCause = CLICKED_URL;
    store.set("urls")(urls);
  }

  render() {
    const store = this.props.store;
    const href = store.get("href");
    const urls = store.get("urls") as URLData[];
    return (
      <div className="url-area__container">
        <p>Sharing-MVP</p>
        <URLRegister
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          href={href}
        ></URLRegister>
        <ul>
          {urls
            .filter(url => url.invisibleCause === NOT_EXPIRED)
            .map((url: URLData) => (
              <URLItem key={url.id} url={url} />
            ))}
        </ul>
      </div>
    );
  }
}

export const URLArea = Store.withStore(UrlAreaComponent);
