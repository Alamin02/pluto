import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

const textCollapse = `
A watch is a portable timepiece intended to be carried or worn by
 a living being. It is designed to keep a consistent movement 
 despite the motions caused by the person's activities. 
`;
const DescriptionCollapse = ({ title, k, text }) => {
  return (
    <Collapse
      expandIconPosition="right"
      bordered={true}
      defaultActiveKey={["1"]}
    >
      <Panel header={title} key={k}>
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};

export default function CollapsibleDescriptionContainer() {
  return (
    <div>
      <DescriptionCollapse title="Description" k="1" text={textCollapse} />
      <DescriptionCollapse title="Ratings(0)" k="2" text={textCollapse} />
    </div>
  );
}
