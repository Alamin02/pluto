import { Grid } from "antd";
import classNames from "classnames";
import styles from "./HeaderSection.module.css";

const { useBreakpoint } = Grid;

export default function HeaderSection({ headerText }) {
  const screens = useBreakpoint();

  return (
    <div>
      <h2
        className={classNames(
          { [styles.header]: screens },
          { [styles.headerSm]: screens.xs }
        )}
      >
        {headerText}
      </h2>
    </div>
  );
}
