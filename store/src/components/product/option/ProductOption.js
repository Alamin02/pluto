import React from 'react';
import { Row, Col } from 'antd';
import styles from './ProductOption.module.css'

import SearchOption from "./SearchOption"
import OptionSelect from "./OptionSelect"
import ViewIcon from "../ViewIcon"
import Description from "../Description"

const ProductOption = () => {
    return (
        <div className={styles.productOption}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Description name='SORT BY:' />
                    <OptionSelect />
                </Col>
                <Col span={8} className={styles.searchBar}>
                    <SearchOption />
                </Col>
                <Col span={8} className={styles.iconList}>
                    <Description name='VIEW' />
                    <ViewIcon />
                </Col>
            </Row>
        </div>
    )
}
export default ProductOption;
