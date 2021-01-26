import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
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
        <BrowserRouter>
            <div className={styles.footer}>
                <Row className={styles.footerSectionOne}>
                    <Col span={8}>
                        <ul>
                            <li>
                                <Link to='#'>Contact us</Link>
                            </li>
                            <li>
                                <Link to='#'>Shipping & Returns</Link>
                            </li>
                            <li>
                                <Link to='#'>Gift Cards</Link>
                            </li>
                            <li>
                                <Link to='#'>Privacy</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col span={8}>
                        <ul>
                            <li>
                                <Link to='#'>About Us</Link>
                            </li>
                            <li>
                                <Link to='#'>The concept</Link>
                            </li>
                            <li>
                                <Link to='#'>Press</Link>
                            </li>
                            <li>
                                <Link to='#'>Artists</Link>
                            </li>
                        </ul>
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
                    <Col span={8} className={styles.iconSection}>
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
        </BrowserRouter>
    );
}

export default Footer;
