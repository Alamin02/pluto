import React from "react";
import styles from "./ProductView.module.css";

export default function PriceAndSummary(props) {
  const { summaryText, productName, ProductPrice } = props;
  return (
    <div>
      <div>
        <h1>{productName}</h1>
        <b>৳&nbsp;{ProductPrice}</b>
        <p>{summaryText}</p>
      </div>
    </div>
  );
}
