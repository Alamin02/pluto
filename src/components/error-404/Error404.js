import { Link } from "react-router-dom";

import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import styles from "./Error404.module.css";
import ShockedMan from "./404.gif";

function Error404() {
  return (
    <div className={styles.container}>
      <img src={ShockedMan} alt="ShockedMan" className={styles.gifStyle} />
      <p className={styles.fourOFourStyle}>Error 404!</p>
      <div>
        <p className={styles.firstParagraphStyle}>Looks like you are lost.</p>
        <br />
        The page you are looking for is not available!
      </div>
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
