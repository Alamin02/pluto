import React from "react";
import { Statistic, Row, Col, Card, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title } = Typography;

const siteStatisticCard = {
  padding: "30px",
  background: "#ececec",
};

export default function Overview() {
  return (
    <div>
      <div style={siteStatisticCard}>
        <Title level={3}>Current Site Status</Title>
        <Row gutter={8}>
          <Col span={12}>
            <Card>
              <Statistic
                style={{ width: "10rem" }}
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                style={{ width: "10rem" }}
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>

      <br />
      <div style={siteStatisticCard}>
        <Title level={3}>User info</Title>
        <Row gutter={8}>
          <Col span={12}>
            <Card>
              <Statistic title="Active Users" value={112893} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="Account Balance" value={112893} precision={2} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
