import React from 'react'
import { Typography, Grid } from 'antd';
import 'antd/dist/antd.css';
import styles from './MainHeader.module.css'
import classNames from "classnames";

const { Title } = Typography;
const { useBreakpoint } = Grid;
const MainHeader = ({ name, sub }) => {
    const screens = useBreakpoint();
    return (
        <div className={styles.productDetails}>
            <Title className={classNames(
                { [styles.myTitle]: screens },
                { [styles.myTitleXs]: screens.xs }
            )}>{name}</Title>
            <Title level={5} className={classNames(
                { [styles.myTitle]: screens },
                { [styles.subTitleXs]: screens.xs }
            )}>{sub}</Title>
        </div>
    )
}

export default MainHeader;
