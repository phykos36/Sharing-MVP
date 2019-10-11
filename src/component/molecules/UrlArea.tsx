import React from "react";
import { URLData } from "../../URLData/URLData";
import { Store } from "../../Store";

class UrlAreaComponent extends React.Component<{ store }> {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    const store = this.props.store;
    store.set("href")(event.currentTarget.value);
  }

  // TODO: 10個こえたらはみ出たものの削除 #6
  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const store = this.props.store;
    const href = store.get("href");
    const urls = store.get("urls");

    store.set("href")("");
    store.set("urls")([...urls, { href }]);
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
          <div>{url.href}</div>
        ))}
      </div>
    );
  }
}

export const URLArea = Store.withStore(UrlAreaComponent);
