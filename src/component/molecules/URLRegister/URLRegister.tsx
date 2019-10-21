import React from "react";
interface Props {
  handleChange(event: React.FormEvent<HTMLInputElement>): void;
  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  href: string;
}

export const URLRegister: React.FC<Props> = ({
  handleChange,
  handleSubmit,
  href,
}) => {
  return (
    <div className="com-m-URLRegister__container">
      <input
        className="url-area__input"
        onChange={handleChange}
        placeholder="URLを貼り付け"
        type="text"
        value={href}
      />
      <button className="add-btn" onClick={handleSubmit}>
        追加
      </button>
    </div>
  );
};
