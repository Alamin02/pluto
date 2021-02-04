import { Menu } from "antd";

import styles from "./Navbar.module.css";

import {
  PhoneOutlined,
  StarOutlined,
  HomeOutlined,
  MailOutlined,
  ShopOutlined,
  ReadOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const shopList = [
  {
    id: 1,
    listItem: "Smartphone",
    href: "#",
  },
  {
    id: 2,
    listItem: "Desktop",
    href: "#",
  },
  {
    id: 3,
    listItem: "Laptop",
    href: "#",
  },
  {
    id: 4,
    listItem: "Printer",
    href: "#",
  },
];

function Navbar() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.navbarTop}>
        <div>
          <PhoneOutlined /> +880 1234 123456
        </div>
        <div className={styles.siteName}>Pluto</div>
        <div>
          <Link>Log in</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link>
            <ShoppingOutlined />
          </Link>
        </div>
      </nav>
      <hr className={styles.navHr} />
      <Menu mode="horizontal" className={styles.navbarBottom}>
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <SubMenu icon={<ShopOutlined />} title="Shop">
          {shopList.map((listItemEach) => (
            <Menu.Item key={listItemEach.id}>
              <Link to={listItemEach.href}></Link>
              {listItemEach.listItem}
            </Menu.Item>
          ))}
        </SubMenu>

        <Menu.Item icon={<StarOutlined />}>
          <Link>Features</Link>
        </Menu.Item>

        <Menu.Item icon={<AppstoreOutlined />}>
          <Link>Portfolio</Link>
        </Menu.Item>

        <Menu.Item icon={<ReadOutlined />}>
          <Link>Blog</Link>
        </Menu.Item>

        <Menu.Item icon={<MailOutlined />}>
          <Link>Contact</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
