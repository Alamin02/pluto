import React, { useState } from "react";
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
  MessageOutlined,
  EnvironmentOutlined,
  PicCenterOutlined,
  FileImageOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import styles from "./Dashboard.module.css";

import DashboardRoutes from "./DashboardRoutes";

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
    itemName: "categories",
    itemUrl: "/categories",
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
    itemName: "addresses",
    itemUrl: "/addresses",
    icon: <EnvironmentOutlined />,
  },
  {
    id: 7,
    itemName: "orders",
    itemUrl: "/orders",
    icon: <ShoppingCartOutlined />,
  },
  {
    id: 8,
    itemName: "Blogs",
    itemUrl: "/blogs",
    icon: <MessageOutlined />,
  },
  {
    id: 9,
    itemName: "Carousel",
    itemUrl: "/carousel",
    icon: <PicCenterOutlined rotate={90} />,
  },
  {
    id: 10,
    itemName: "Featured Products",
    itemUrl: "/featured-products",
    icon: <FileImageOutlined />,
  },
  {
    id: 11,
    itemName: "Settings",
    itemUrl: "/settings",
    icon: <SettingOutlined />,
  },
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.dashboard}>
      {/* sidebar */}
      <div className={styles.sidebarContainer}>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {React.createElement(
              collapsed ? DoubleRightOutlined : DoubleLeftOutlined
            )}
          </Button>
          <Menu mode="vertical" theme="dark" inlineCollapsed={collapsed}>
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
        <DashboardRoutes />
      </div>
    </div>
  );
}
