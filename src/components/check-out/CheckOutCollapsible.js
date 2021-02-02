import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

const panelHeadingAndText = [
  {
    id: "02",
    text: `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `,
    heading: `Billing Information`,
  },
  {
    id: "03",
    text: `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `,
    heading: `Shipping Method`,
  },
  {
    id: "04",
    text: `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `,
    heading: ` Payment Information`,
  },
  {
    id: "05",
    text: `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `,
    heading: `Order Review`,
  },
];

export default function CheckOutCollapsible() {
  return (
    <>
      <Collapse defaultActiveKey={["1"]}>
        {panelHeadingAndText.map((single) => (
          <Panel
            showArrow={false}
            header={
              <h4 style={{ textTransform: "upperCase", fontWeight: "600" }}>
                {[single.id, ". ", single.heading]}
              </h4>
            }
          >
            <p>{single.text}</p>
          </Panel>
        ))}
      </Collapse>
    </>
  );
}
