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
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { agent } from "../../helpers/agent";
import styles from "./Navbar.module.css";
import appStyles from "../../App.module.css";
import pluto_logo from "../../assets/logo/pluto_logo_transparent_bg.png";

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
  const imageData = useSelector((state) => state.file.image);

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
    if (token) {
      agent
        .getProfile(token)
        .then((res) => res.json())
        .then(({ data, errors }) => {
          if (errors) {
            localStorage.removeItem("token");
          }
          setUser(data);
          if (data) dispatch({ type: "user/profile", payload: data.image });
        });
    }
  }, [token, dispatch]);

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
      <Menu.Item style={{ padding: "0.5rem 1.5rem" }}>
        <Link to="/profile">
          <div style={{ textTransform: "capitalize" }}>{user && user.name}</div>
          <div style={{ color: "gray" }}>{user && user.email}</div>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item style={{ padding: "0.5rem 1.5rem" }}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item style={{ padding: "0.5rem 1.5rem" }}>
        <Link to="/profile/edit">Update profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item style={{ padding: "0.5rem 1.5rem" }}>
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
            <Link to="/">
              <img
                src={pluto_logo}
                alt="Pluto"
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
              <Link to="/cart">
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
                {imageData ? (
                  <Avatar className={styles.avatarStyle} src={imageData.path} />
                ) : (
                  <Avatar
                    className={styles.avatarStyle}
                    icon={<UserOutlined />}
                  />
                )}
              </Dropdown>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to="/cart">
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
            <Link to="/" className={styles.menuStyle}>
              home
            </Link>
          </Menu.Item>

          <SubMenu
            title={
              <span>
                Categories
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
                            <Link to={`/category/${subCategory.id}`}>
                              {subCategory.name}
                            </Link>
                          </Menu.Item>
                        );
                      })}
                    </SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={category.id} className={styles.menuStyle}>
                      <Link to={`/category/${category.id}`}>
                        {category.name}
                      </Link>
                    </Menu.Item>
                  );
                }
              })}
          </SubMenu>

          <Menu.Item>
            <Link to="/products" className={styles.menuStyle}>
              all products
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/offers" className={styles.menuStyle}>
              offers
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/contact" className={styles.menuStyle}>
              contact
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
