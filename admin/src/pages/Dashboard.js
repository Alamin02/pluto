import React from "react";
import { Link } from "react-router-dom";

import styles from "./Dashboard.module.css";

import DashboardContent from "./DashboardContent";

const sidebarInfo = [
  {
    id: 1,
    itemName: "overview",
    itemUrl: "/",
  },
  {
    id: 2,
    itemName: "products",
    itemUrl: "/products",
  },
  {
    id: 3,
    itemName: "offers",
    itemUrl: "/offers",
  },
  {
    id: 4,
    itemName: "users",
    itemUrl: "/users",
  },
];

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      {/* sidebar */}
      <div className={styles.sidebar}>
        {sidebarInfo.map((item) => (
          <div key={item.id}>
            <Link to={item.itemUrl} className={styles.sidebarItem}>
              {item.itemName}
            </Link>
          </div>
        ))}
      </div>

      {/* content */}
      <div className={styles.content}>
        <DashboardContent />
      </div>
    </div>
  );
}
