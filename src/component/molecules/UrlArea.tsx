import React from "react";
import { URLData } from "../../URLData/URLData";
import { Store, StoreInterface } from "../../Store";
import { dbManipulator } from "../../Storage";

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
        urls = urls.filter(
          (url: URLData) =>
            url.createdAt.getTime() + deltaTimeByDelete > new Date().getTime()
        );
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
    store.set("urls")([...urls, { href, createdAt: new Date() }]);
  }

  handleURLClicked(urlId: number) {
    const store = this.props.store;
    const urls = store.get("urls") as URLData[];
    store.set("urls")(urls.filter(x => x.id !== urlId));
  }

  render() {
    const store = this.props.store;
    const href = store.get("href");
    const urls = store.get("urls");
    return (
      <div className="url-area__container">
        <p>Sharing-MVP</p>
        <input
          className="url-area__input"
          onChange={this.handleChange}
          type="text"
          value={href}
        />
        <button className="add-btn" onClick={this.handleSubmit}>
          追加
        </button>

        {urls.map((url: URLData) => (
          <a
            key={url.id}
            href={url.href}
            onClick={() => this.handleURLClicked(url.id)}
            target="_blank"
          >
            {url.href}
          </a>
        ))}
      </div>
    );
  }
}

export const URLArea = Store.withStore(UrlAreaComponent);
