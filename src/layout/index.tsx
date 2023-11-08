import { ThemeContext } from "@/contexts/Theme";
import classNames from "classnames";
import { FC, ReactNode, useContext } from "react";
import Snow from "./Snow";

interface IKsLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const KsLayout: FC<IKsLayoutProps> = ({ children, title, description }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames("ks-layout", { "-dark": theme })}>
      <Snow className={classNames("snow", { "-show ": theme })} />

      <main>{children}</main>
    </div>
  );
};

export default KsLayout;
