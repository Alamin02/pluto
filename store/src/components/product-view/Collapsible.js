import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

export default function Collapsible({ title, body, key }) {
  return (
    <Collapse
      style={{ marginBottom: "10px" }}
      expandIconPosition="right"
      bordered={true}
      defaultActiveKey={["1"]}
    >
      <Panel header={title} key={key}>
        <p>{body}</p>
      </Panel>
    </Collapse>
  );
}
