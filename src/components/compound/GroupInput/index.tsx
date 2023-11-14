import { Input } from "@/components/primitive";
import { default as classNames } from "classnames";
import { FormikErrors, FormikTouched } from "formik";
import { FC, ReactNode, useEffect } from "react";

interface IInputProps {
  type?: "text" | "number" | "password" | "email" | "file";
  value?: string | number;
  onChange?: ({ name, value, files }: { name: string; value: string | number; files?: any }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  fieldClassName?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  gutterBottom?: boolean;
  icon?: boolean;
  typeIcon?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  size?: "sm" | "md" | "lg";
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  dividerStart?: boolean;
  dividerEnd?: boolean;
  nameButton?: string;
  hidden?: boolean;
  accept?: string;
}

export const GroupInput: FC<IInputProps> = ({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  className,
  inputClassName,
  disabled,
  required,
  readOnly,
  autoFocus,
  name,
  id,
  gutterBottom,
  icon,
  typeIcon,
  startAdornment,
  endAdornment,
  size,
  touched,
  error,
  fieldClassName,
  dividerStart,
  dividerEnd,
  nameButton,
  hidden,
  accept,
}) => {
  const invalid: Boolean = !!error && !!touched;

  return (
    <div
      className={classNames(
        "ks-input",
        { "-gutter-bottom": gutterBottom },
        { "-has-adornment": !!startAdornment || !!endAdornment },
        { "-invalid": invalid },
        { "-disabled": disabled },
        { "-has-icon": icon },
        { "-divider": !!dividerStart || !!dividerEnd },
        { "-hidden": hidden },
        `-${size}`,
        className
      )}
    >
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={classNames("field", fieldClassName)}>
        {startAdornment && <div className="adornment -start">{startAdornment}</div>}
        {dividerStart && <span className="divider" />}
        <Input
          type={type}
          className={inputClassName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoFocus={autoFocus}
          name={name}
          value={value}
          id={id}
          hidden={hidden}
          accept={accept}
        />
        {icon && <button className="search-icon">{typeIcon}</button>}
        {endAdornment && <div className="adornment -end">{endAdornment}</div>}
        {dividerEnd && (
          <div className="btn-group">
            <span className="divider" />
            <button className="btn-find">{nameButton}</button>
          </div>
        )}
      </div>
    </div>
  );
};

GroupInput.defaultProps = {
  type: "text",
  onChange: () => null,
  onBlur: () => null,
  autoFocus: false,
  readOnly: false,
  required: false,
  disabled: false,
  gutterBottom: false,
  icon: false,
  typeIcon: undefined,
  endAdornment: undefined,
  startAdornment: undefined,
  size: "md",
  dividerStart: false,
  dividerEnd: false,
  nameButton: "",
  hidden: false,
  accept: "",
};
