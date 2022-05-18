const JoinButton = ({ text, classNames = "", onClick }: IProps) => {
  return (
    <button className={`join-button ${classNames}`} onClick={onClick}>
      {text}
    </button>
  );
};

type IProps = {
  text: string;
  classNames?: string;
  onClick: () => void;
};

export { JoinButton };
