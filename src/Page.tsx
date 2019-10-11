import React, { Component } from "react";
import { URLArea } from "./component/molecules/UrlArea";
import { Store } from "./Store";

export class Page extends Component {
  render() {
    return (
      <Store.Container>
        <URLArea />
      </Store.Container>
    );
  }
}
