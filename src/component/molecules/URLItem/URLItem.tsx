import React from "react";
import { URLData, ExtendedURL } from "../../../URLData/URLData";

interface Props {
  url: URLData;
}

export const URLItem: React.FC<Props> = ({ url }) => {
  const remainTime = ExtendedURL.generate(url).getRemainTime();
  return (
    <li key={url.id}>
      <a
        href={url.href}
        onClick={() => this.handleURLClicked(url.id)}
        target="_blank"
      >
        {url.href}
      </a>
      <span>{`あと${remainTime[0]}日${remainTime[1]}時間`}</span>
    </li>
  );
};
