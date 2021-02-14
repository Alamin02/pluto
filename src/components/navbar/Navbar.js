import { Link } from "react-router-dom";
import { Menu, Grid } from "antd";
import {
  PhoneOutlined,
  ShoppingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

import styles from "./Navbar.module.css";
import { navbarMenus, shopSubmenus } from "./navbarInfo";

const { useBreakpoint } = Grid;
const { SubMenu } = Menu;
const menuStyle = {
  textTransform: "capitalize",
};
const downOutlinedStyle = {
  marginLeft: "0.5rem",
  marginRight: "0",
  fontSize: "0.8rem",
};

function Navbar() {
  const screens = useBreakpoint();

  return (
    <div className={styles.navBackgroundColor}>
    <div className={styles.navContainer}>
      <nav className={styles.navbarTop}>
        <div>
          <PhoneOutlined /> +880 1234 123456
        </div>
        <div className={styles.logoContainer}>
          <Link to={navbarMenus.homeUrl}>
            <img
              src={navbarMenus.logoSrc}
              alt={navbarMenus.logoAlt}
              className={classNames(
                { [styles.logo]: screens },
                { [styles.logoXs]: screens.xs }
              )}
            />
          </Link>
        </div>
        <div className={styles.navbarTopRight}>
          <Link to={navbarMenus.loginUrl}>log in</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to={navbarMenus.cartUrl}>
            <ShoppingOutlined />
          </Link>
        </div>
      </nav>
      <hr className={styles.navHr} />

      {/* bottom navbar */}
      <Menu mode="horizontal" className={styles.navbarBottom} style={{ backgroundColor: "#FAFAFA" }} >
        <Menu.Item>
          <Link to={navbarMenus.homeUrl} style={menuStyle}>
            {navbarMenus.home}
          </Link>
        </Menu.Item>

        <SubMenu
          title={
            <span>
              {navbarMenus.shop}
              <DownOutlined style={downOutlinedStyle} />
            </span>
          }
          style={menuStyle}
        >
          {shopSubmenus.map((shopSubmenu) => (
            <Menu.Item key={shopSubmenu.id} style={menuStyle}>
              <Link to={shopSubmenu.shopSubmenuUrl}></Link>
              {shopSubmenu.submenu}
            </Menu.Item>
          ))}
        </SubMenu>

        <Menu.Item>
          <Link to={navbarMenus.offersUrl} style={menuStyle}>
            {navbarMenus.offers}
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to={navbarMenus.blogUrl} style={menuStyle}>
            {navbarMenus.blog}
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to={navbarMenus.contactUrl} style={menuStyle}>
            {navbarMenus.contact}
          </Link>
        </Menu.Item>
      </Menu>
    </div>
    </div>
  );
}

export default Navbar;
