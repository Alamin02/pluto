import React from "react";
import { Row, Table, Col, Input, Button } from "antd";
import styles from "./CheckOut.module.css";
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
  {
    key: "3",
    Product: "Item3",
    unitprice: 32,
    Quantity: "1",
    Total: "110tk",
  },
];

export default function BillingInfo() {
  return (
    <div>
      <Row justify="center">
        <Col sm={24}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Col>
        <Col sm={12} lg={10} offset={2}>
          <div style={{ marginTop: "30px" }}>
            Apply Coupon: &nbsp;
            <Input
              className={styles.inputStyled}
              placeholder="Enter a coupon code..."
            />
            <span style={{ marginLeft: "120px" }}>
              <Button type="primary">Submit</Button>
            </span>
          </div>
        </Col>
        <Col xs={8} lg={{ span: 9, offset: 2 }}>
          <table>
            <tbody>
              <tr>
                <td className={styles.tableData}> Vat(5%)</td>
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
        </Col>
      </Row>
    </div>
  );
}
