import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Grid, message, Dropdown } from "antd";
import { Avatar, Badge } from "antd";
import classNames from "classnames";
import {
  PhoneOutlined,
  ShoppingOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { agent } from "../../helpers/agent";
import styles from "./Navbar.module.css";
import appStyles from "../../App.module.css";
import { navbarMenus } from "./navbarInfo";

const { useBreakpoint } = Grid;
const { SubMenu } = Menu;

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.tokenValue);
  const [productsCategory, setProductsCategory] = useState([]);
  const [user, setUser] = useState("");
  const screens = useBreakpoint();
  const productList = useSelector((state) => state.cart.products);

  function fetchProductsCategory() {
    agent
      .getCategories()
      .then((res) => res.json())
      .then(({ data }) => {
        setProductsCategory(data);
      });
  }

  useEffect(() => {
    fetchProductsCategory();
  }, []);

  useEffect(() => {
    if (token)
      agent
        .getMe(token)
        .then((res) => res.json())
        .then(({ data, error }) => {
          if (error) {
            localStorage.removeItem("token");
          }
          setUser(data);
        });
  }, [token]);

  const handleLogout = () => {
    dispatch({
      type: "auth/logout",
      payload: localStorage.removeItem("token"),
    });
    message.success("You have logged out");
    history.push("/");
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/profile">
          <div style={{ textTransform: "capitalize" }}>{user && user.name}</div>
          <div style={{ color: "gray" }}>{user && user.email}</div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/profile/edit">Update profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div onClick={handleLogout}>
          <LogoutOutlined />
          <span className={styles.logoutText}>Logout</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navBackgroundColor}>
      <div className={appStyles.containerMain}>
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
          {!token || !token.length || !user ? (
            <div className={styles.navbarTopRight}>
              <Link to="/login">log in</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to={navbarMenus.cartUrl}>
                <Badge count={!!productList.length ? productList.length : 0}>
                  <Avatar
                    className={styles.avatarStyle}
                    icon={<ShoppingOutlined />}
                  />
                </Badge>
              </Link>
            </div>
          ) : (
            <div className={styles.navbarTopRight}>
              <Dropdown overlay={menu} placement="bottomRight">
                <Avatar
                  className={styles.avatarStyle}
                  icon={<UserOutlined />}
                />
              </Dropdown>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to={navbarMenus.cartUrl}>
                <Badge count={!!productList.length ? productList.length : 0}>
                  <Avatar
                    className={styles.avatarStyle}
                    icon={<ShoppingOutlined />}
                  />
                </Badge>
              </Link>
            </div>
          )}
        </nav>
        <hr className={styles.navHr} />

        {/* bottom navbar */}
        <Menu mode="horizontal" className={styles.navbarBottom}>
          <Menu.Item>
            <Link to={navbarMenus.homeUrl} className={styles.menuStyle}>
              {navbarMenus.home}
            </Link>
          </Menu.Item>

          <SubMenu
            title={
              <span>
                {navbarMenus.shop}
                <DownOutlined className={styles.downOutlinedStyle} />
              </span>
            }
            className={styles.menuStyle}
          >
            {productsCategory &&
              productsCategory.map((category) => {
                if (category.children) {
                  return (
                    <SubMenu
                      key={category.id}
                      title={category.name}
                      className={styles.menuStyle}
                    >
                      {category.children.map((subCategory) => {
                        return (
                          <Menu.Item key={subCategory.id}>
                            {subCategory.name}
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={category.id} className={styles.menuStyle}>
                      {category.name}
                    </Menu.Item>
                  );
                }
              })}
          </SubMenu>

          <Menu.Item>
            <Link to={navbarMenus.offersUrl} className={styles.menuStyle}>
              {navbarMenus.offers}
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={navbarMenus.blogUrl} className={styles.menuStyle}>
              {navbarMenus.blog}
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={navbarMenus.contactUrl} className={styles.menuStyle}>
              {navbarMenus.contact}
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
