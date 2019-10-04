import React from "react";

class Delete_btn extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false
    };
  }
  render() {
    return (
      <div className="delete_btn">
        <input type="submit" value="削除" onChange={this.handleDelete} />
      </div>
    );
  }
  handleDelete = e => {
    this.setState({ flag: !flag });
  };
}

export default Delete_btn;
