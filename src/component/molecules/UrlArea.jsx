import React from "react";

export class UrlArea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      urls: [],
      href: ""
    };
  }
  render() {
    return (
      <div className="url-area__container">
        <p>Sharing-MVP</p>
        <input
          className="url-area__input"
          name="url"
          onChange={this.handleChange}
          type="text"
          value={this.state.href}
        />
        <button className="add-btn" onClick={this.handleSubmit}>
          追加
        </button>

        {this.state.urls.map(url => (
          <div>
            {url.href}
            <button
              className="delete-btn"
              onClick={this.handleDelete}
              type="submit"
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
    );
  }

  handleChange = e => {
    this.setState({ href: e.target.value });
  };

  // TODO: 10個こえたらはみ出たものの削除 #6
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      urls: [...this.state.urls, { href: this.state.href }],
      href: ""
    });
  };
}
