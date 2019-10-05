import React, { Component } from "react";
import { UrlArea } from "./component/molecules/url-area";

export class Page extends Component {
  render() {
    return (
      <div className="page">
        <UrlArea />
      </div>
    );
  }
}