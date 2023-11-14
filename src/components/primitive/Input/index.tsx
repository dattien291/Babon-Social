import { default as classNames } from "classnames";
import { ChangeEvent, FC, ReactNode } from "react";

interface IInputProps {
  type?: "text" | "number" | "password" | "email" | "file";
  value?: string | number;
  onChange?: ({ name, value, files }: { name: string; value: number | string; files?: any }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  hidden?: boolean;
  accept?: string;
}

export const Input: FC<IInputProps> = ({
  type,
  value,
  onChange = () => null,
  onBlur = () => null,
  placeholder,
  className,
  disabled,
  required,
  readOnly,
  autoFocus,
  name,
  id,
  hidden,
  accept,
}) => {
  return (
    <input
      type={type}
      id={id}
      className={classNames("input", className)}
      onChange={!disabled ? (e) => onChange({ name: e.target.name, value: e.target.value, files: e.target.files }) : () => null}
      onBlur={!disabled ? (e) => onBlur({ name: e.target.name, value: e.target.value }) : () => null}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      autoComplete="off"
      autoFocus={autoFocus}
      name={name}
      value={value}
      hidden={hidden}
      accept={accept}
    />
  );
};

Input.defaultProps = {
  type: "text",
  onChange: () => null,
  onBlur: () => null,
  autoFocus: false,
  readOnly: false,
  required: false,
  disabled: false,
};
