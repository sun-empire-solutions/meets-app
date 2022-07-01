const Input = ({ classNames, placeholder }: IProps) => {
  return <input type="text" className={classNames} placeholder={placeholder} />;
};

type IProps = {
  placeholder?: string;
  classNames?: string;
};

export { Input };