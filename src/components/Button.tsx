import { ReactNode } from "react";

const Button = ({ text, classNames, onClick, icon }: IProps) => {
  return (
    <button className={`button ${classNames}`} onClick={onClick}>
      {text} {icon}
    </button>
  );
};

type IProps = {
  text?: string;
  icon?: ReactNode;
  classNames?: string;
  onClick?: () => void;
};

export { Button };
