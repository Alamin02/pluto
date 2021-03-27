import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("user").readAny("blog");
ac.grant("user").readAny("product");
ac.grant("user").readAny("category");

ac.grant("admin")
  .readAny("blog")
  .createAny("blog")
  .updateAny("blog")
  .deleteAny("blog");

ac.grant("admin")
  .readAny("product")
  .createAny("product")
  .updateAny("product")
  .deleteAny("product");

ac.grant("admin")
  .readAny("category")
  .createAny("category")
  .updateAny("category")
  .deleteAny("category");

export default ac;
