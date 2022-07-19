const Button = ({ icon, text, classNames, onClick }: IProps) => {
  return (
    <button className={`button ${classNames ?? ""}`} onClick={onClick}>
      {icon}
      {text && <span className="text">{text}</span>}
    </button>
  );
};

type IProps = {
  icon?: JSX.Element;
  text?: string;
  classNames?: string;
  onClick: () => void;
};

export { Button };
