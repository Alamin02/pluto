import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

ac.grant("user").readAny("blog");
ac.grant("user").readAny("product");
ac.grant("user").readAny("category");
ac.grant("user").readAny("offer");
ac.grant("user").readAny("settings");

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

ac.grant("admin")
  .readAny("offer")
  .createAny("offer")
  .updateAny("offer")
  .deleteAny("offer");

ac.grant("admin").readAny("settings").updateAny("settings");

export default ac;
