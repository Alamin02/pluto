import React from "react";
import styles from "./ProductView.module.css";

export default function PriceAndSummary(props) {
  const { summaryText, productName, ProductPrice } = props;
  return (
    <div>
      <div className={styles.marginBottom}>
        <h1>{productName}</h1>
        <h2>
          <b>BDT&nbsp;{ProductPrice}</b>
        </h2>
        <p>{summaryText}</p>
      </div>
    </div>
  );
}
