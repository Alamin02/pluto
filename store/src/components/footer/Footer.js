import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { Grid, Row, Col } from "antd";
import classNames from "classnames";

import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import styles from "./Footer.module.css";

const { useBreakpoint } = Grid;

function Footer() {
  const screens = useBreakpoint();

  return (
    <BrowserRouter>
      <div className={styles.footer}>
        <div className={styles.container}>
          <Row
            className={classNames(
              { [styles.footerSectionOne]: screens },
              { [styles.footerSectionOneXs]: screens.xs }
            )}
          >
            <Col md={8} xs={12}>
              <ul>
                <li>
                  <Link to="#">Contact us</Link>
                </li>
                <li>
                  <Link to="#">Shipping & Returns</Link>
                </li>
                <li>
                  <Link to="#">Gift Cards</Link>
                </li>
                <li>
                  <Link to="#">Privacy</Link>
                </li>
              </ul>
            </Col>
            <Col md={8} xs={12}>
              <ul>
                <li>
                  <Link to="#">About Us</Link>
                </li>
                <li>
                  <Link to="#">The concept</Link>
                </li>
                <li>
                  <Link to="#">Press</Link>
                </li>
                <li>
                  <Link to="#">Artists</Link>
                </li>
              </ul>
            </Col>
            <Col md={8} xs={24}>
              <p>Stay in Touch</p>
              <div className={styles.inputField}>
                <input type="text" placeholder="SUBSCRIBE" />
              </div>
            </Col>
          </Row>
          <Row className={styles.footerSectionTwo}>
            <Col xl={8} xs={24} className={styles.copyRight}>
              <p>Copyright &copy; 2020</p>
            </Col>
            <Col xl={8} xs={24} className={styles.allAbout}>
              <ul>
                <li>
                  <Link to="#">blog</Link>
                </li>
                <li>
                  <Link to="#">About us</Link>
                </li>
                <li>
                  <Link to="#">contact us</Link>
                </li>
                <li>
                  <Link to="#">faq</Link>
                </li>
                <li>
                  <Link to="#">my account</Link>
                </li>
              </ul>
            </Col>
            <Col
              xl={8}
              sm={24}
              xs={24}
              className={classNames(
                { [styles.iconSection]: screens },
                { [styles.iconSectionXs]: screens.xs },
                { [styles.iconSectionXs]: screens.sm },
                { [styles.iconSection]: screens.md },
                { [styles.iconSection]: screens.xl },
                { [styles.iconSection]: screens.xxl }
              )}
            >
              <span>
                <Link to="#">
                  <TwitterOutlined />
                </Link>
              </span>
              <span>
                <Link to="#">
                  <FacebookOutlined />
                </Link>
              </span>
              <span>
                <Link to="#">
                  <InstagramOutlined />
                </Link>
              </span>
              <span>
                <Link to="#">
                  <WhatsAppOutlined />
                </Link>
              </span>
              <span>
                <Link to="#">
                  <YoutubeOutlined />
                </Link>
              </span>
            </Col>
          </Row>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Footer;
