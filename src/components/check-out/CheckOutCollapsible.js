import React from "react";
import { Collapse } from "antd";
import BillingInfo from "./BillingInfo";
import ShippingInfo from "./ShippingInfo";
import PaymentMethod from "./PaymentMethod";
const { Panel } = Collapse;

const panelHeadingAndText = [
  {
    id: "02",
    text: <ShippingInfo />,
    heading: `Shipping Information`,
  },
  {
    id: "03",
    text: <BillingInfo />,
    heading: `Billing Information`,
  },
  {
    id: "04",
    text: <PaymentMethod />,
    heading: ` Payment Method`,
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
      <Collapse>
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
