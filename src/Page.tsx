import React, { Component } from "react";
import { URLArea } from "./component/molecules/UrlArea";
import { Store } from "./Store";
import { dbAll, dbManipulator } from "./Storage";

export class Page extends Component {
  render() {
    dbAll();
    return (
      <Store.Container>
        <URLArea />
      </Store.Container>
    );
  }
}
