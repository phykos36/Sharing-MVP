import React from "react";

export class UrlArea extends React.Component {
  constructor(props) {
    super(props);
    (this.handleChange = this.handleChange.bind(this)),
      (this.state = {
        lists: [],
        url: ""
      });
  }
  render() {
    return (
      <div className="url-area__container">
        <p>Sharing-MVP</p>
        <input
          className=""
          name="url"
          onChange={this.handleChange}
          type="text"
          value={this.state.url}
        />
        <button className="add_btn" onClick={this.handleSubmit}>
          追加
        </button>

        {this.state.lists.map(l => (
          <div>
            {l.url}{" "}
            <button
              className="delete_btn"
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
    this.setState({ url: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      lists: [...this.state.lists, { url: this.state.url }],
      url: ""
    });
  };
}