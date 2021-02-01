import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import styles from "./Error404.module.css";
import ShockedMan from "./404.gif";

function Error404() {
  return (
    <div className={styles.container}>
      <img src={ShockedMan} alt="ShockedMan" className={styles.gifStyle} />
      <p className={styles.fourOFourStyle}>Error 404!</p>
      <p>
        <div className={styles.firstParagraphStyle}>
          Looks like you are lost.
        </div>
        <br />
        The page you are looking for is not available!
      </p>
      <Link to="/">
        <Button
          type="primary"
          className={styles.buttonStyle}
          icon={<HomeOutlined />}
        >
          Go back to home page
        </Button>
      </Link>
    </div>
  );
}

export default Error404;
