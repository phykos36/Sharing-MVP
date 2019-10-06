//未実装
import React from "react";

export class FavoriteButton extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="favorite-btn">
        <input
          onChange={this.handleFavorite}
          type="submit"
          value="お気に入り"
        />
      </div>
    );
  }
}
