import site_logo from "../../assets/logo/pluto_logo_transparent_bg.png";

const navbarMenus = {
  id: 1,
  logoSrc: site_logo,
  logoAlt: "pluto",

  home: "home",
  homeUrl: "/",

  shop: "shop",

  offers: "offers",
  offersUrl: "",

  blog: "blog",
  blogUrl: "/blogs",

  contact: "contact",
  contactUrl: "/contact",

  loginUrl: "",
  cartUrl: "/cart",
};

const shopSubmenus = [
  {
    id: 1,
    submenu: "smartphone",
    shopSubmenuUrl: "#",
  },
  {
    id: 2,
    submenu: "desktop",
    shopSubmenuUrl: "#",
  },
  {
    id: 3,
    submenu: "laptop",
    shopSubmenuUrl: "#",
  },
  {
    id: 4,
    submenu: "printer",
    shopSubmenuUrl: "#",
  },
  {
    id: 5,
    submenu: "monitor",
    shopSubmenuUrl: "#",
  },
];

export { navbarMenus, shopSubmenus };
