import React from 'react';
import { Row, Col } from 'antd';
import {
    TwitterOutlined,
    FacebookOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <Row className={styles.footerSectionOne}>
                <Col span={8}>
                    <p>Contact us</p>
                    <p>Shipping & Returns</p>
                    <p>Gift Cards</p>
                    <p>Privacy</p>
                </Col>
                <Col span={8}>
                    <p>About Us</p>
                    <p>The concept</p>
                    <p>Press</p>
                    <p>Artists</p>
                </Col>
                <Col span={8}>
                    <p>Stay in Touch</p>
                    <div className={styles.inputField}>
                        <input type="text" placeholder="SUBSCRIBE" />
                    </div>
                </Col>
            </Row>
            <Row className={styles.footerSectionTwo}>
                <Col span={8} className={styles.copyRight}>
                    <p>Copyright &copy; 2020</p>
                </Col>
                <Col span={8} className={styles.allAbout}>
                    <ul>
                        <li>
                            <a href="#">blog</a>
                        </li>
                        <li>
                            <a href="#">About us</a>
                        </li>
                        <li>
                            <a href="#">contact us</a>
                        </li>
                        <li>
                            <a href="#">faq</a>
                        </li>
                        <li>
                            <a href="#">my account</a>
                        </li>
                    </ul>
                </Col>
                <Col span={8} className={styles.iconSection}>
                    <span>
                        <TwitterOutlined />
                    </span>
                    <span>
                        <FacebookOutlined />
                    </span>
                    <span>
                        <InstagramOutlined />
                    </span>
                    <span>
                        <WhatsAppOutlined />
                    </span>
                    <span>
                        <YoutubeOutlined />
                    </span>
                </Col>
            </Row>
        </div>
    );
}

export default Footer;

