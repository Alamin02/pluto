import React from "react";
import { Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const navbar = {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#001529",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 1rem",
};

const siteLogo = {
  height: "30px",
};

const divider = {
  margin: "0 1rem",
  marginBottom: "0.4rem",
  fontSize: "1.5rem",
  color: "#a8a8a8",
};

const navLeft = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const adminPanelText = {
  display: "inline-block",
  fontSize: "1.5rem",
  color: "white",
  textTransform: "capitalize",
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
          <div style={adminPanelText}>admin panel</div>
          <div style={divider}>|</div>
          <img
            src="https://i.imgur.com/ld4xrld.png"
            alt="logo"
            style={siteLogo}
          />
        </div>
        <div>
          <Button
            type="text"
            style={{ color: "white" }}
            icon={<UserOutlined />}
          >
            {email}
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
