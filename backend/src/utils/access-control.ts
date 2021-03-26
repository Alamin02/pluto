import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("user").readAny("blog");

ac.grant("admin")
  .readAny("blog")
  .deleteAny("blog")
  .updateAny("blog")
  .createAny("blog");
export default ac;
