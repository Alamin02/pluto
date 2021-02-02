import React from "react";

import styles from "./QuantityCounter.module.css";

function QuantityCounter({ value, onChange }) {
  return (
    <div className={styles.counterRootDiv}>
      <div className={styles.iconStyle}>
        <button
          className={styles.buttonStyle}
          onClick={() => onChange(value - 1)}
        >
          <span className={styles.iconStyle}> - </span>
        </button>
      </div>
      <input type="number" value={value} className={styles.counterInput} />
      <div>
        <button
          className={styles.buttonStyle}
          onClick={() => onChange(value + 1)}
        >
          <span className={styles.iconStyle}> + </span>
        </button>
      </div>
    </div>
  );
}

export default QuantityCounter;
