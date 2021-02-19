import React from "react";

export default function PriceAndSummary(props) {
  const { summaryText, productName, ProductPrice } = props;
  return (
    <div>
      <div>
        <h1>{productName}</h1>
        <h2>
          <b>৳&nbsp;{ProductPrice}</b>
        </h2>
        <p>{summaryText}</p>
      </div>
    </div>
  );
}
