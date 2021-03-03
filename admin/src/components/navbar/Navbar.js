import React from "react";
import { Button } from "antd";
import styles from "./Navbar.module.css";

const navbarInfo = {
  logo: "pluto_logo",
  name: "Pluto",
};

export default function Navbar() {
  return (
    <div>
      <div className={styles.navbar}>
        <div>
          <span>
            <img
              src="https://i.imgur.com/ld4xrld.png"
              alt={navbarInfo.name}
              className={styles.siteLogo}
            />
          </span>
          <span className={styles.siteName}>{navbarInfo.name}</span>
        </div>
        <div>
          <Button style={{ backgroundColor: "#F1F5F9" }}>Logout</Button>
        </div>
      </div>
    </div>
  );
}
