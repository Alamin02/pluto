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
          <a href=".">Log in</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href=".">
            <ShoppingOutlined />
          </a>
        </div>
      </nav>
      <hr className={styles.navHr} />
      <Menu mode="horizontal" className={styles.navbarBottom}>
        <Menu.Item icon={<HomeOutlined />}>
          <a href=".">Home</a>
        </Menu.Item>

        <SubMenu icon={<ShopOutlined />} title="Shop">
          {shopList.map((listItemEach) => (
            <Menu.Item key={listItemEach.id}>
              <a href={listItemEach.href}></a>
              {listItemEach.listItem}
            </Menu.Item>
          ))}
        </SubMenu>

        <Menu.Item icon={<StarOutlined />}>
          <a href=".">Features</a>
        </Menu.Item>

        <Menu.Item icon={<AppstoreOutlined />}>
          <a href=".">Portfolio</a>
        </Menu.Item>

        <Menu.Item icon={<ReadOutlined />}>
          <a href=".">Blog</a>
        </Menu.Item>

        <Menu.Item icon={<MailOutlined />}>
          <a href=".">Contact</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
