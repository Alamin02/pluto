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

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuId, setMenuId] = useState(1);

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
            style={{ marginBottom: 16 }}
          >
            {React.createElement(
              collapsed ? DoubleRightOutlined : DoubleLeftOutlined
            )}
          </Button>
          <Menu mode="vertical" theme="dark" inlineCollapsed={collapsed}>
            {sidebarInfo.map((item) => (
              <Menu.Item
                key={item.id}
                icon={item.icon}
                onClick={() => {
                  setMenuId(item.id);
                  console.log(menuId);
                }}
              >
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
