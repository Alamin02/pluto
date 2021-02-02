import React from "react";
import { Anchor } from "antd";
import styles from "./ProductView.module.css";
const { Link } = Anchor;

const titleAll = [
  { id: "1", title: "Need help?" },
  { id: "2", title: "Contact us" },
  { id: "3", title: "Categories:" },
  { id: "4", title: "MenCollection" },
  { id: "5", title: "Women" },
  { id: "6", title: "tags:" },
  { id: "7", title: "T-shirt" },
  { id: "8", title: "shirt" },
];
export default function Category() {
  return (
    <div>
      <Anchor affix={false}>
        {titleAll.map((t) => (
          <Link className={styles.dInline} href="#" title={t.title} id={t.id} />
        ))}
      </Anchor>
    </div>
  );
}
