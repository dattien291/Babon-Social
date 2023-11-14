import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";
import { FC, ReactNode } from "react";

interface ILinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "unset";
  color?: "primary" | "secondary" | "black" | "white" | string;
  hasUnderline?: boolean;
  textTransform?: "unset" | "uppercase" | "capitalize";
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  target?: "_self" | "_blank";
  textClassName?: string;
}

export const KaLink: FC<ILinkProps> = ({
  children,
  textTransform,
  hasUnderline,
  className,
  target,
  color,
  size,
  leftIcon,
  rightIcon,
  textClassName,
  ...rest
}) => {
  return (
    <Link target={target} {...rest}>
      <span
        className={classNames(
          "ks-link",
          `-${textTransform}`,
          `-${size}`,
          {
            [`-${color}`]: color,
          },
          { "-hasIcon": leftIcon || rightIcon },
          { "-underline": hasUnderline },
          className
        )}
      >
        {leftIcon}

        {hasUnderline ? (
          <span className={classNames("text", { "-underline": hasUnderline }, textClassName)}>{children}</span>
        ) : (
          children
        )}

        {rightIcon}
      </span>
    </Link>
  );
};

KaLink.defaultProps = {
  hasUnderline: false,
  textTransform: "unset",
  target: "_self",
  size: "unset",
  title: "",
  textClassName: "",
  color: "black",
};
