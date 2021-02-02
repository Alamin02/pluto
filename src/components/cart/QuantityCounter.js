import React, { useState } from "react";

import styles from "./QuantityCounter.module.css";

function QuantityCounter() {
  let [count, setCount] = useState(1);
  return (
    <div className={styles.counterRootDiv}>
      <div className={styles.iconStyle}>
        <button
          className={styles.buttonStyle}
          onClick={() => setCount(count - 1)}
        >
          <span className={styles.iconStyle}> - </span>
        </button>
      </div>
      <input type="number" value={count} className={styles.counterInput} />
      <div>
        <button
          className={styles.buttonStyle}
          onClick={() => setCount(count + 1)}
        >
          <span className={styles.iconStyle}> + </span>
        </button>
      </div>
    </div>
  );
}

export default QuantityCounter;
