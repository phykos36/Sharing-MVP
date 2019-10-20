import React from "react";
import { ExtendURL } from "../../../URL/ExtendURL/ExtendURL";
import { IURL } from "../../../URL/IURL";

interface Props {
  url: IURL;
}

export const URLItem: React.FC<Props> = ({ url }) => {
  const remainTime = ExtendURL.generate(url).getRemainTime();
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
