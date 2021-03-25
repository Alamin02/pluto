import React from "react";

const layoutStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 0.5rem",
};

export default function Layout({ children }) {
  return <div style={layoutStyle}>{children}</div>;
}
