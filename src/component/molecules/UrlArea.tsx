import React from "react";
import { URLData } from "../../URLData/URLData";

interface State {
  href: string;
  urls: URLData[];
}

export class UrlArea extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      href: "",
      urls: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ href: e.currentTarget.value });
  }

  // TODO: 10個こえたらはみ出たものの削除 #6
  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    this.setState({
      urls: [...this.state.urls, { href: this.state.href }],
      href: ""
    });
  }

  render() {
    return (
      <div className="url-area__container">
        <p>Sharing-MVP</p>
        <input
          className="url-area__input"
          onChange={this.handleChange}
          type="text"
          value={this.state.href}
        />
        <button className="add-btn" onClick={this.handleSubmit}>
          追加
        </button>

        {this.state.urls.map(url => (
          <div>{url.href}</div>
        ))}
      </div>
    );
  }
}
