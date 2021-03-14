import React from "react";
import { Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

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

const adminUserName = {
  fontSize: "1rem",
};

export default function Navbar({ email }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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
          <Button type="link" icon={<UserOutlined />}>
            <span style={adminUserName}>{email}</span>
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            type="primary"
            danger
          >
            logout
          </Button>
        </div>
      </div>
    </div>
  );
}
