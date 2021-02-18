import { notification } from "antd";

const openNotification = ({ productTitle, type }) => {
  notification[type]({
    message: "Success!",
    description: `${productTitle} has been added to your cart.`,
    duration: 4,
  });
};

export default openNotification;
