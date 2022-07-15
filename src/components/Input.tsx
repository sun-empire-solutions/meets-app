import { forwardRef, LegacyRef } from "react";

const Input = forwardRef(
  (
    { classNames, placeholder, value, onChange }: IProps,
    ref: LegacyRef<HTMLInputElement>
  ) => (
    <input
      ref={ref}
      type="text"
      className={`input ${classNames}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
);

type IProps = {
  placeholder?: string;
  classNames?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export { Input };
