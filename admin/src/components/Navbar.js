import React from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

// styling start
const navbar = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#001529",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 1rem",
};

const siteLogo = {
  marginRight: "2rem",
  height: "40px",
};

const navLeft = {
  display: "flex",
  alignItems: "center",
};

const adminPanelText = {
  display: "inline-block",
  fontSize: "2rem",
  color: "white",
  textTransform: "capitalize",
};

const logout = {
  backgroundColor: "#F1F5F9",
  marginRight: "1rem",
  textTransform: "capitalize",
};
// styling end

export default function Navbar() {
  return (
    <div>
      <div style={navbar}>
        <div style={navLeft}>
          <img
            src="https://i.imgur.com/ld4xrld.png"
            alt="logo"
            style={siteLogo}
          />
          <div style={adminPanelText}>admin panel</div>
        </div>
        <div>
          <Button style={logout} size="large" icon={<LogoutOutlined />}>
            logout
          </Button>
        </div>
      </div>
    </div>
  );
}
