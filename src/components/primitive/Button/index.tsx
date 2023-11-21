import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

type ButtonColorType = "primary" | "dark" | "light" | "primary-light" | "secondary" | "light-green";

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: ButtonColorType;
  size?: "md" | "lg";
  noBorder?: boolean;
  fullWidth?: boolean;
  square?: boolean;
  iconOnly?: boolean;
  circle?: boolean;
  variant?: "contained" | "outlined";
  disabled?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isLoading?: boolean;
  backgroundHover?: ButtonColorType;
  colorHover?: ButtonColorType;
}

export const Button: FC<IButtonProps> = ({
  color,
  size,
  noBorder,
  fullWidth,
  className,
  children,
  square,
  iconOnly,
  circle,
  variant,
  disabled,
  startAdornment,
  endAdornment,
  isLoading,
  backgroundHover,
  colorHover,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        `ks-button`,
        { "-no-border": noBorder },
        { "-full-width": fullWidth },
        { "-square": square },
        { "-icon-only": iconOnly },
        { "-circle": circle },
        { "-disabled": disabled },
        { "-isLoading": isLoading },
        { "-adornment": startAdornment || endAdornment },
        { [`-bg-hover-${backgroundHover}`]: backgroundHover },
        { [`-color-hover-${colorHover}`]: colorHover },
        `-${size}`,
        `-${variant}-${color}`,
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {startAdornment}
      {!isLoading ? (
        children
      ) : (
        <CircularProgress
          color="inherit"
          classes={{
            root: "ks-loading-root",
          }}
        />
      )}
      {endAdornment}
    </button>
  );
};

Button.defaultProps = {
  color: "primary",
  noBorder: false,
  fullWidth: false,
  className: "",
  type: "button",
  square: false,
  iconOnly: false,
  circle: false,
  variant: "contained",
};
