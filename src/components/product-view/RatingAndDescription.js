import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse;

const DescriptionCollapse = ({ title, k, text }) => {
  return (
    <Collapse
      style={{ marginBottom: "10px" }}
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

export default function RatingAndDescription({ descriptionText, rating }) {
  return (
    <div>
      <DescriptionCollapse title="Description" k="1" text={descriptionText} />
      <DescriptionCollapse title="Ratings(0)" k="2" text={rating} />
    </div>
  );
}
