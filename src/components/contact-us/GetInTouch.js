import React from 'react';
import { Row, Col } from 'antd';
import styles from './GetInTouch.module.css'
import image01 from '../../assets/images/address-icon.png'
import image02 from '../../assets/images/phone-icon.png'
import image03 from '../../assets/images/mail-icon.png'
const getInTouchData = [
    {
        id: 1,
        imageUrl: image01,
        option: 'Address',
        title: 'Find Us',
        location: '1Hd- 50, 010 Avenue, NY 90001'
    },
    {
        id: 2,
        imageUrl: image02,
        option: 'phone',
        title: 'Make a Call',
        location: '009-215-5596 (toll free)'
    },
    {
        id: 3,
        imageUrl: image03,
        option: 'email',
        title: 'Send Email',
        location: 'contact@example.com'
    },

];


function GetInTouch() {
    return (
        <div className={styles.container}>
            <Row gutter={[24, 24]} justify="center">
                {getInTouchData.map((element) => {
                    return (
                        <Col span={8} key={element.id} xs={24} sm={22} md={20} lg={8} xl={8}>
                            <div className={styles.headStyle}>
                                <div className={styles.bodyStyle}>
                                    <img src={element.imageUrl} alt={element.option} className={styles.imgStyle} />
                                    <h2 className={styles.titleStyle}>{element.title}</h2>
                                    <span>{element.location}</span>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default GetInTouch;
