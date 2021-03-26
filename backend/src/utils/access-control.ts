import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("user").readAny("blog");

ac.grant("admin")
  .readAny("blog")
  .deleteAny("blog")
  .updateAny("blog")
  .createAny("blog");

ac.grant("user").readAny("products");

ac.grant("admin")
  .readAny("products")
  .deleteAny("products")
  .updateAny("products")
  .createAny("products");

export default ac;
