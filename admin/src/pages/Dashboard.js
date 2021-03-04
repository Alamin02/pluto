import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import {
  DoubleRightOutlined,
  DoubleLeftOutlined,
  BarChartOutlined,
  UserOutlined,
  PercentageOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  TagOutlined,
} from "@ant-design/icons";

import styles from "./Dashboard.module.css";

import DashboardContent from "./DashboardContent";

const sidebarInfo = [
  {
    id: 1,
    itemName: "overview",
    itemUrl: "/",
    icon: <BarChartOutlined />,
  },
  {
    id: 2,
    itemName: "products",
    itemUrl: "/products",
    icon: <SkinOutlined />,
  },
  {
    id: 3,
    itemName: "offers",
    itemUrl: "/offers",
    icon: <PercentageOutlined />,
  },
  {
    id: 4,
    itemName: "catagories",
    itemUrl: "/catagories",
    icon: <TagOutlined />,
  },
  {
    id: 5,
    itemName: "users",
    itemUrl: "/users",
    icon: <UserOutlined />,
  },
  {
    id: 6,
    itemName: "orders",
    itemUrl: "/orders",
    icon: <ShoppingCartOutlined />,
  },
];

export default class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className={styles.dashboard}>
        {/* sidebar */}
        <div className={styles.sidebarContainer}>
          <div>
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {React.createElement(
                this.state.collapsed ? DoubleRightOutlined : DoubleLeftOutlined
              )}
            </Button>
            <Menu
              defaultSelectedKeys={["1"]}
              mode="vertical"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              {sidebarInfo.map((item) => (
                <Menu.Item key={item.id} icon={item.icon}>
                  <Link
                    to={item.itemUrl}
                    style={{ marginRight: "1rem", textTransform: "capitalize" }}
                  >
                    {item.itemName}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>

        {/* content */}
        <div className={styles.contentContainer}>
          <DashboardContent />
        </div>
      </div>
    );
  }
}
