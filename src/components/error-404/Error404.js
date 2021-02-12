import { Link } from "react-router-dom";
import { Grid } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import classNames from "classnames";

import styles from "./Error404.module.css";
import ShockedMan from "./404.gif";
import ButtonBlack from "../styled-components/ButtonBlack";

const { useBreakpoint } = Grid;
const buttonBlackStyle = {
  marginTop: "1rem",
};
const iconStyle = {
  marginRight: "0.6rem",
};

function Error404() {
  const screens = useBreakpoint();

  return (
    <div className={styles.container}>
      <img src={ShockedMan} alt="ShockedMan" className={classNames(
        { [styles.gifStyle]: screens },
        { [styles.gifStyleXs]: screens.xs },
      )} />
      <p
        className={classNames(
          { [styles.fourOFourStyle]: screens },
          { [styles.fourOFourStyleXs]: screens.xs }
        )}
      >
        Error 404!
      </p>
      <div>
        <p className={styles.firstParagraphStyle}>Looks like you are lost.</p>
        <br />
        The page you are looking for is not available!
      </div>
      <br />
      <Link to="/">
        <ButtonBlack
          style={buttonBlackStyle}
          buttonText={
            <span>
              <HomeOutlined style={iconStyle} />
              Go back to home page
            </span>
          }
        ></ButtonBlack>
      </Link>
      <div className={styles.emptySpace}></div>
    </div>
  );
}

export default Error404;
