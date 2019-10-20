import React from "react";
import { URLData } from "../../../URLData/URLData";

interface Props {
  url: URLData;
}

export const URLItem: React.FC<Props> = ({ url }) => {
  return (
    <li key={url.id}>
      <a
        href={url.href}
        onClick={() => this.handleURLClicked(url.id)}
        target="_blank"
      >
        {url.href}
      </a>
    </li>
  );
};
