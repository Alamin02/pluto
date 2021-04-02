import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Grid, Button } from "antd";
import { Badge } from "antd";
import { agent } from "../../helpers/agent";
import {
  PhoneOutlined,
  ShoppingOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import classNames from "classnames";

import styles from "./Navbar.module.css";
import appStyles from "../../App.module.css";
import { navbarMenus } from "./navbarInfo";

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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.tokenValue);
  const [productsCategory, setProductsCategory] = useState([]);
  const screens = useBreakpoint();
  const productList = useSelector((state) => state.cart.products);

  function fetchProductsCategory() {
    agent
      .getCategories()
      .then((res) => res.json())
      .then(({ data }) => {
        setProductsCategory(data);
        console.log(data);
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
        });
  }, [token]);

  const handleLogout = () => {
    const removeToken = localStorage.removeItem("token");
    dispatch({ type: "auth/logout", payload: removeToken });
  };

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
          {(!token.length) ? (
            <div className={styles.navbarTopRight}>
              <Link to="/login">
                log in
              </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to={navbarMenus.cartUrl}>
                <ShoppingOutlined />
              </Link>
            </div>
          ) : (
            <div className={styles.navbarTopRight}>
              <Link to="#">
                <UserOutlined />
              </Link>&nbsp;&nbsp;
              <Button
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                type="primary"
                danger

              >
              </Button>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to={navbarMenus.cartUrl}>
                <ShoppingOutlined />
              </Link>
            </div>
          )}
        </nav>
        <hr className={styles.navHr} />

        {/* bottom navbar */}
        <Menu mode="horizontal" className={styles.navbarBottom}>
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
            {productsCategory && productsCategory.map((category) => {
              if (category.children) {
                return (
                  <SubMenu key={category.id} title={category.name} style={menuStyle}>
                    {category.children.map((subCategory) => {
                      return (<Menu.Item key={subCategory.id}>{subCategory.name}</Menu.Item>)
                    }
                    )}
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={category.id} style={menuStyle}>{category.name}</Menu.Item>
                )
              }
            })}
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

          <Menu.Item>
            <Link to={navbarMenus.cartUrl} style={menuStyle}>
              <Badge
                size="small"
                count={!!productList.length ? productList.length : 0}
              >
                {navbarMenus.cart}
              </Badge>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
