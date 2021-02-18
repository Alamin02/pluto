import React from 'react';
import { Typography } from 'antd';
import styles from './Header.module.css'

const { Title } = Typography;

const Header = ({ title }) => {
    return (
        <div className={styles.titleHolder}>
            <Title level={2}>{title}</Title>
        </div>
    );
};

export default Header;
