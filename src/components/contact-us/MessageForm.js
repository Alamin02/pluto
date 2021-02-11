import React from 'react';
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import styles from './MessageForm.module.css'
import ButtonBlack from '../styled-components/ButtonBlack'


const { TextArea } = Input;
const { Title, Text } = Typography;
const labelStyle = {
    marginBottom: '10px',
    color: '#808080',
    fontSize: '15px',
    fontWeight: 'bold',
}
const textAreaStyle = {
    marginBottom: '20px'
}

function MessageForm() {
    return (
        <div className={styles.contactUsContainer}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Title className={styles.contactTitle}>Message Us</Title>
                    <Text type="secondary" className={styles.contactDescription}>If you wish to be considered for employment at Pluto, please do not send a message, here – instead, please complete Pluto's job application  and our Human Resources department will contact you after their review of your submitted information.</Text>
                </Col>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div style={labelStyle}>
                                <label htmlFor='Name'  >Name</label>
                            </div>
                            <div>
                                <Input size="large" />
                            </div>
                            <Text type="secondary">First</Text>
                        </Col>
                        <Col span={12}>
                            <div className={styles.lastLabel}>
                                <Input size="large" />
                            </div>
                            <Text type="secondary">Last</Text>
                        </Col>
                        <Col span={12}>
                            <div style={labelStyle}>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div>
                                <Input size="large" type="email" />
                            </div>
                        </Col>
                    </Row>
                    <div style={labelStyle} >
                        <label htmlFor='Comments'>Comments</label>
                    </div>
                    <div style={textAreaStyle}>
                        <TextArea rows={4} />
                    </div>
                    <div className={styles.buttonStyle}>
                        <Link to="#">
                            <ButtonBlack
                                buttonText="Submit"
                                className={styles.buttonStyle}
                            />
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default MessageForm;
