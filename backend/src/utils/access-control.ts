import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("user").readAny("blog");

ac.grant("admin")
  .readAny("blog")
  .deleteAny("blog")
  .updateAny("blog")
  .createAny("blog");

ac.grant("user").readAny("product");

ac.grant("admin")
  .readAny("product")
  .deleteAny("product")
  .updateAny("product")
  .createAny("product");

export default ac;
