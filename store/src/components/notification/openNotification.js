import { notification } from "antd";

const openNotification = ({ productTitle, type, placement }) => {
  notification[type]({
    message: "Success!",
    description: `${productTitle} has been added to your cart.`,
    duration: 4,
    placement: `${placement}`,
  });
};

export default openNotification;
