import React from "react";
import { Button } from "antd";

export default function ButtonStyled({ title, onClick }) {
  return (
    <Button
      style={{
        color: "white",
        backgroundColor: "#000",
        border: "1px solid rgb(233, 193, 15)",
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
