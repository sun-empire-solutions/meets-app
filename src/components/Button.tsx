const Button = ({ text, classNames, onClick }: IProps) => {
  return (
    <button className={`button ${classNames}`} onClick={onClick}>
      {text}
    </button>
  );
};

type IProps = {
  text: string;
  classNames?: string;
  onClick: () => void;
};

export { Button };
