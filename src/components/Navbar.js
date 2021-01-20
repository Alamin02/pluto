import React from "react";
import "./Navbar.css";
import { Menu } from "antd";
import "./Navbar.css";
import {
  PhoneOutlined,
  StarOutlined,
  HomeOutlined,
  MailOutlined,
  ShopOutlined,
  ReadOutlined,
  AppstoreOutlined,
  ShoppingOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

class Navbar extends React.Component {
  state = {
    current: 'mail',
  };
  
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <div className="navbar">
        <nav className="navbar-top">
          <div>
            <PhoneOutlined /> +880 1234 123456
          </div>
          <div style={{fontSize: "2rem"}} className="site-name">PLUTO</div>
          <div>Log in&nbsp;&nbsp;|&nbsp;&nbsp;<ShoppingOutlined /></div>
        </nav>
        <hr className="nav-hr" />
        <Menu
          onClick={this.handleClick}
          mode="horizontal"
          className="navbar-bottom"
        >
          <Menu.Item key="Home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>

          <SubMenu key="Shop" icon={<ShopOutlined />} title="Shop">
            <Menu.ItemGroup title="Desktop">
              <Menu.Item key="Shop:1">Option 1</Menu.Item>
              <Menu.Item key="Shop:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Laptop">
              <Menu.Item key="Shop:3">Option 3</Menu.Item>
              <Menu.Item key="Shop:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>

          <Menu.Item key="Features" icon={<StarOutlined />}>
            Features
          </Menu.Item>

          <Menu.Item key="Portfolio" icon={<AppstoreOutlined />}>
            <a href="https://ant.design" target="_blank" rel="noreferrer">
              Portfolio
            </a>
          </Menu.Item>

          <Menu.Item key="Blog" icon={<ReadOutlined />}>
            Blog
          </Menu.Item>

          <Menu.Item key="Contact" icon={<MailOutlined />}>
            Contact
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
