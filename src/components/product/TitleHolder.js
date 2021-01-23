import React from 'react';
import { Typography } from 'antd';
import styles from './TitleHolder.module.css'

const { Title } = Typography;

const TitleHolder = ({ title }) => {
    return (
        <div className={styles.titleHolder}>
            <Title level={2}>{title}</Title>
        </div>
    );
};

export default TitleHolder;
