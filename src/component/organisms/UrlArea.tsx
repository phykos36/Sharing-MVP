import React from "react";
import { Store } from "../../Store";
import { dbManipulator } from "../../Storage";
import { URLRegister } from "../molecules/URLRegister/URLRegister";
import { URLItem } from "../molecules/URLItem/URLItem";
import { IURL, generateURL } from "../../URL/IURL";
import { ExtendURL, updateURLVisible } from "../../URL/ExtendURL/ExtendURL";

class UrlAreaComponent extends React.Component<{ store }> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleURLClicked = this.handleURLClicked.bind(this);
  }

  componentDidMount() {
    const store = this.props.store;
    dbManipulator((objStore) => {
      const getReq = objStore.getAll();
      getReq.onsuccess = (event) => {
        let urls: IURL[] = getReq.result;
        urls = urls.map((url) => {
          return updateURLVisible(url);
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
    const urls = store.get("urls") as IURL[];

    store.set("href")("");
    store.set("urls")([...urls, generateURL(href)]);
  }

  handleURLClicked(urlId: number) {
    const store = this.props.store;
    const urls = store.get("urls") as IURL[];
    const changedIndex = urls.findIndex((url) => url.id === urlId);
    const extendURL = ExtendURL.generate(urls[changedIndex]);
    extendURL.clickedURL();
    urls[changedIndex] = extendURL.build();
    store.set("urls")(urls);
  }

  render() {
    const store = this.props.store;
    const href = store.get("href");
    const urls = store.get("urls") as IURL[];
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
            .map((url) => {
              return ExtendURL.generate(url);
            })
            .filter((url) => url.isView())
            .map((extendURL) => {
              return extendURL.build();
            })
            .map((url: IURL) => (
              <URLItem
                key={url.id}
                url={url}
                handleURLClicked={this.handleURLClicked}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export const URLArea = Store.withStore(UrlAreaComponent);
