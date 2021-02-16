import React from "react";
import { Anchor } from "antd";
import styles from "./ProductView.module.css";
const { Link } = Anchor;

const titleAll = [
  { id: "1", title: "Categories:" },
  { id: "2", title: "MenCollection" },
  { id: "3", title: "Women" },
  { id: "4", title: "tags:" },
  { id: "5", title: "T-shirt" },
  { id: "6", title: "shirt" },
];
export default function Category() {
  return (
    <div>
      <Anchor affix={false}>
        {titleAll.map((title) => (
          <Link
            className={styles.displayInline}
            href="#"
            title={title.title}
            id={title.id}
            key={title.id}
          />
        ))}
      </Anchor>
    </div>
  );
}
