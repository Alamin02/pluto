import React from "react";
import { Row, Table, Col, Input } from "antd";
import styles from "./CheckOut.module.css";
const { Search } = Input;
const onSearch = (value) => console.log(value);
const columns = [
  {
    title: "Product",
    dataIndex: "Product",
    key: "Product",
  },
  {
    title: "unitprice",
    dataIndex: "unitprice",
    key: "unitprice",
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
    key: "Quantity",
  },
  {
    title: "Total",
    dataIndex: "Total",
    key: "Total",
  },
];

const data = [
  {
    key: "1",
    Product: "Item1",
    unitprice: 32,
    Quantity: "1",
    Total: "110tk",
  },
  {
    key: "2",
    Product: "Jim Green",
    unitprice: 42,
    Quantity: "1",
    Total: "110tk",
  },
  {
    key: "3",
    Product: "Item2",
    unitprice: 32,
    Quantity: "1",
    Total: "110tk",
  },
];
export default function BillingInfo() {
  return (
    <div>
      <Row justify="center">
        <Col xs={24} sm={24} md={24}>
          <div className={styles.tableContainer}>
            <Table
              columns={columns}
              size={"large"}
              dataSource={data}
              bordered={true}
              pagination={false}
            />
          </div>
        </Col>

        <Col
          xs={{ offset: 6, span: 18 }}
          sm={{ offset: 10, span: 14 }}
          md={{ span: 10, offset: 14 }}
        >
          <div className={styles.couponCode}>
            <Search
              placeholder="Apply Coupon Code.."
              allowClear
              enterButton="Submit"
              size="middle"
              onSearch={onSearch}
            />
          </div>
        </Col>
        <Col xs={20} sm={12} md={12} lg={12}>
          <div className={styles.cardTotalTableContainer}>
            <h2 className={styles.cardTitle}>Cart Total</h2>
            <table className={styles.cardTable}>
              <tbody>
                <tr>
                  <td className={styles.tableData}>Vat(5%)</td>
                  <td className={styles.tableData}>10tk</td>
                </tr>

                <tr>
                  <td className={styles.tableData}> Shipping cost</td>
                  <td className={styles.tableData}>10tk</td>
                </tr>
                <tr>
                  <td className={styles.tableData}> Total(+tax)</td>
                  <td className={styles.tableData}>10tk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  );
}
