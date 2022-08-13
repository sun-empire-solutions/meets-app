import { forwardRef, LegacyRef } from "react";
import InputMask from "react-input-mask";

const Input = forwardRef(
  (
    { classNames, placeholder, value, onChange, mask }: IProps,
    ref: LegacyRef<HTMLInputElement>
  ) => (
    <InputMask mask={mask} maskChar={null} value={value} onChange={onChange}>
      {(inputProps) => (
        <input
          {...inputProps}
          ref={ref}
          type="text"
          className={`input ${classNames}`}
          placeholder={placeholder}
        />
      )}
    </InputMask>
  )
);

type IProps = {
  placeholder?: string;
  classNames?: string;
  mask?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export { Input };
