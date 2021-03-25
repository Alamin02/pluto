import React from "react";
import styles from "./ProductMenu.module.css";
import { BrowserRouter, NavLink } from "react-router-dom";

function ProductMenu() {
  return (
    <BrowserRouter>
      <div className={styles.productNav}>
        <ul className={styles.menu}>
          <li>
            <NavLink to="#">Men</NavLink>
          </li>
          <li>
            <NavLink to="#">Women</NavLink>
          </li>
          <li>
            <NavLink to="#">Accessories</NavLink>
          </li>
          <li>
            <NavLink to="#">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="#">Bags</NavLink>
          </li>
        </ul>
      </div>
    </BrowserRouter>
  );
}

export default ProductMenu;
