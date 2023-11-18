import { Textarea } from "@/components/primitive";
import classNames from "classnames";
import { FC, useContext } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { ThemeContext } from "@/contexts/Theme";

interface IGroupTextareaProps {
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  label?: string;
  onChange?: ({ name, value }: { name: string; value: string | number }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  gutterBottom?: boolean;
  readOnly?: boolean;
  value?: string;
}

export const GroupTextarea: FC<IGroupTextareaProps> = ({
  className,
  textareaClassName,
  labelClassName,
  label,
  onChange,
  onBlur,
  placeholder,
  disabled,
  required,
  name,
  id,
  touched,
  error,
  gutterBottom,
  readOnly,
  value,
}) => {
  const invalid = !!error && !!touched;
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={classNames(
        "ks-textarea",
        { "-gutter-bottom": gutterBottom },
        { "-disabled": disabled },
        { "-invalid": invalid },
        { "-dark": theme },
        className
      )}
    >
      {label && (
        <label htmlFor={id} className={classNames("label", labelClassName)}>
          {label}
        </label>
      )}
      <Textarea
        id={id}
        name={name}
        className={textareaClassName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};

GroupTextarea.defaultProps = {};
