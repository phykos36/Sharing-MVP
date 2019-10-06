//未実装
import React from "react";

export class DeleteButton extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false
    };
  }
  render() {
    return (
      <div className="delete-btn">
        <input onChange={this.handleDelete} type="submit" value="削除" />
      </div>
    );
  }
  handleDelete = e => {
    this.setState({ flag: !flag });
  };
}
