const Input = ({ classNames, placeholder, value, onChange }: IProps) => {
  return (
    <input
      type="text"
      className={`input ${classNames}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

type IProps = {
  placeholder?: string;
  classNames?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export { Input };
