import React from "react";
import { Button } from "antd";
export default function ButtonStyled({title}) {
  return <Button style={{color:"white",backgroundColor:"#000", border: '1px solid rgb(233, 193, 15)'}}>{title}</Button>;
}
