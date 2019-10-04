import React from "react";

class Url_Area extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      url: "",
 //   flag: false  削除の時使う
    };
  }
  render() {
    return (
      <div className="url_area">
        <p>Sharing-MVP</p>
        <input
          type="text"
          name="url"
          className="url_area-input"
          onChange={this.handleChange}
          value={this.state.url}
        />
        <button className="add_btn" onClick={this.handleSubmit}>追加</button>

        {this.state.lists.map(l => (
          <div>
            {l.url}{" "}
            <button type="submit" className="delete_btn" onClick={this.handleDelete}>
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
//  TODO: 削除機能
/*  
    handleDelete = (event) => {
    event.preventDefault();
    this.setState({
      flag : !flag
    })
  }
*/

// TODO: 10個こえたらはみ出たものの削除
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      lists: [...this.state.lists, { url: this.state.url }],
      url: ""
    });
  };
}

export default Url_Area;