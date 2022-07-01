const Input = ({ classNames, placeholder }: IProps) => {
  return (
    <input
      type="text"
      className={`input ${classNames}`}
      placeholder={placeholder}
    />
  );
};

type IProps = {
  placeholder?: string;
  classNames?: string;
};

export { Input };
