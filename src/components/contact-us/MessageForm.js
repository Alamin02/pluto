import React from 'react';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import styles from './MessageForm.module.css'


const { TextArea } = Input;
const { Title, Text } = Typography;
const labelStyle = {
    marginBottom: '10px',
    color: '#808080',
    fontSize: '15px',
    fontWeight: 'bold',
}
const submitButton = {
    color: '#ffffff',
    backgroundColor: '#d7df23',
    border: '1px solid #fff'
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
                            <div className={styles.emailInput}>
                                <Input size="large" type="email" />
                            </div>
                        </Col>
                    </Row>
                    <div style={labelStyle} >
                        <label htmlFor='Comments'>Comments</label>
                    </div>
                    <div className={styles.commentsInput}>
                        <TextArea rows={4} />
                    </div>
                    <div className={styles.buttonSection}>
                        <Button style={submitButton}>
                            Submit
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default MessageForm;
