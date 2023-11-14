import classNames from "classnames";
import { FC } from "react";

interface ISnowProps {
  className?: string;
}

const Snow: FC<ISnowProps> = ({ className = "" }) => {
  return (
    <div className={classNames("ks-snow", className)}>
      <div className="snowflake">✽</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">✽</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
    </div>
  );
};

export default Snow;
